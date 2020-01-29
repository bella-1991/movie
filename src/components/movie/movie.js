import React from 'react'

import './movie.css'

export default function Movie ({ movie, selectedMovieChange }) {
    return (
        <section className="movie" onClick={e => selectedMovieChange(movie)}>
            <div className="movie__poster-container">
                <img className="movie__poster" src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title + " poster"} />
            </div>
            <div className="movie__details-container">
                <h2 className="movie__title">{movie.Title} ({movie.Year})</h2>
                <p className="movie__type">Type: {movie.Type}</p>
                <label className="movie__id">IMDB ID: {movie.imdbID}</label>
            </div>
        </section>
    )
}