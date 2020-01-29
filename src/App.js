import React, { useState, useEffect } from 'react'

import { Settings as settings, API_Lables as label, DefaultFilters as filters, ErrorLabels as errors } from './constants'
import Header from './components/header/header'
import Search from './components/search/search'
import Filters from './components/filters/filters'
import Movie from './components/movie/movie'
import SelectedMovie from './components/movie/selectedMovie'
import Pagination from './components/pagination/pagination'
import './App.css'

function App() {
  const [title, setTitle] = useState("Cineworld - Your ultimate movie guide"),
        [movieName, setMovieName] = useState(''),
        [allResults, setAllResults] = useState({}),
        [defaultSort, setDefaultSort] = useState(filters.SORT),
        [defaultType, setDefaultType] = useState(filters.TYPE),
        [defaultPage, setDefaultPage] = useState(filters.PAGE),
        [selectedMovie, setSelectedMovie] = useState({}),
        [error, setError] = useState('')      

  const setMovieData = _ => {
    if (!movieName) return

    fetch(settings.URL + label.API_KEY + settings.API_KEY + label.SEARCH + movieName + label.PAGE + defaultPage)
      .then(rsp => rsp.json())
      .then(allMovies => {
        let results = [],
            pages

        setError('')

        if (allMovies.Search) {
          results = sortResults(allMovies.Search, defaultSort)
          pages = getTotalPages(allMovies)
        } else {
          setError(allMovies.Error)
        } 
        
        setAllResults({ ...allMovies, Search: results, Pages: Math.floor(pages) })
      })
  }

  const sortResults = (results, sort) => {
      let newResults

      switch(sort) {
        case 'ASCE':
          newResults = results.sort((a, b) => a.Title.localeCompare(b.Title))
          break;
        case 'DESC':
          newResults = results.sort((a, b) => a.Title.localeCompare(b.Title)).reverse()
          break;
        default:
            return 
      }

      return newResults
  }

  const getTotalPages = (allResults) => {
    return (parseInt(allResults.totalResults) +  filters.RPP - 1) / filters.RPP
  }

  const setSortChange = value => {
    const results = sortResults(allResults.Search, value)

    setDefaultSort(value)          
    setAllResults({ ...allResults, Search: results })
  }

  const setTypeChange = type => {
    setDefaultType(type)
    setDefaultPage(filters.PAGE)

    fetch(settings.URL + label.API_KEY + settings.API_KEY + label.SEARCH + movieName + (type !== filters.TYPE ? label.TYPE + type : '') + label.PAGE + filters.PAGE)
      .then(rsp => rsp.json())
      .then(allMovies => {
        let results = [],
            pages

        setError('')

        if (allMovies.Search) {
          results = sortResults(allMovies.Search, defaultSort)
          pages = getTotalPages(allMovies)
        } else {
          setError(allMovies.Error)
        } 
        
        setAllResults({ ...allMovies, Search: results, Pages: typeof(pages) !== 'undefined' ? Math.floor(pages) : filters.PAGE })
      })
  }

  const setPageChange = el => {
    const newPage = el.target.getAttribute('data-value')

    setDefaultPage(newPage)

    fetch(settings.URL + label.API_KEY + settings.API_KEY + label.SEARCH + movieName + (defaultType !== filters.TYPE ? label.TYPE + defaultType : '') + label.PAGE + newPage)
      .then(rsp => rsp.json())
      .then(allMovies => {
        let results = [],
            pages

        setError('')

        if (allMovies.Search) {
          results = sortResults(allMovies.Search, defaultSort)          
          pages = getTotalPages(allMovies)
        } else {
          setError(allMovies.Error)
        } 
        
        setAllResults({ ...allMovies, Search: results, Pages: Math.floor(pages) })
      })
  }

  const selectedMovieChange = movie => {
    setAllResults({ ...allResults, selectedIndex: allResults.Search.indexOf(movie) })

    fetch(settings.URL + label.API_KEY + settings.API_KEY + label.TITLE + movie.Title)
      .then(rsp => rsp.json())
      .then(thisMovie => {
        setSelectedMovie(thisMovie) 
      })
  }

  const resetSelectedMovie = _ => {
    setSelectedMovie({})
  }

  const goToMovie = index => {
    setSelectedMovie(allResults.Search[index])
    setAllResults({ ...allResults, selectedIndex: index })

  }

  return (
    <div className="app">
      <Header title={title} />
      <Search 
        setMovieData={setMovieData} 
        movieName={movieName} 
        setMovieName={setMovieName}  />
      {
        // show any errors
        error && <p className="error">{error} {errors.NO_RESULTS} </p>
      }
      { Object.entries(selectedMovie).length !== 0 ? ( 
        // show selected movie detailed view
        <SelectedMovie 
          movie={selectedMovie} 
          resetSelectedMovie={resetSelectedMovie}
          results={(allResults.Search.length-1)}
          currentIndex={allResults.selectedIndex}
          goToMovie={goToMovie} />
      ) : (
        // show movie list
        allResults.Search && (
          <section className="results">
            <Filters 
              sortChange={setSortChange} 
              sort={defaultSort} 
              typeChange={setTypeChange} 
              type={defaultType} 
              totalResults={allResults.totalResults} />
            
            <section className="movies">
              { allResults.Search && allResults.Search.map((eachMovie, index) => (
                <Movie 
                  movie={eachMovie} 
                  key={index} 
                  selectedMovieChange={selectedMovieChange} />
              ))}  
            </section>          
  
            <Pagination 
              pages={allResults.Pages} 
              currentPage={parseInt(defaultPage)} 
              pageChange={setPageChange} />   
          </section>
        )
      )}   
    </div>
  );
}

export default App;
