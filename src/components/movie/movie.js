import React from 'react'

import './movie.css'

export default function Movie ({ movie }) {
    return (
        <div className="movie">
            <div className="movie_poster-container">
                <img className="movie_poster" src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title + " poster"} />
            </div>
            <div className="movie__details-container">
                <h2 className="movie__title">{movie.Title} ({movie.Year})</h2>
                <p className="movie__type">Type: {movie.Type}</p>
                <label className="movie__id">{movie.imdbID}</label>
            </div>
        </div>
    )
}