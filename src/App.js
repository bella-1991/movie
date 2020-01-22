import React, { useState, useEffect } from 'react'

import { Settings as settings, API_Lables as label } from './constants';
import Header from './components/header/header'
import Search from './components/search/search'
import Movie from './components/movie/movie'
import './App.css'

function App() {
  const [title, setTitle] = useState("Cineworld - Your ultimate movie guide")
  const [data, setData] = useState({})
  const [allResults, setAllResults] = useState([])

  const setMovieData = value => {
    const data = {
      title: value
    }

    setData(data)
    // fetchMovieData()
    fetch(settings.URL + label.API_KEY + settings.API_KEY + label.TITLE + data.title)
      .then(rsp => rsp.json())
      .then(allMovies => {
        setAllResults(allMovies.Search)
      })
  }

  return (
    <div className="app">
      <Header title={title} />
      <Search setMovieData={setMovieData}  />
      <div className="movies">
        { allResults.map((eachMovie, index) => (
          <Movie movie={eachMovie} key={index} />
        ))}  
      </div>          
    </div>
  );
}

export default App;
