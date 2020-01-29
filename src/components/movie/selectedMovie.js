import React from 'react'

import { ErrorLabels as errors} from '../../constants'
import './movie.css'

export default function SelectedMovie ({ movie, resetSelectedMovie, results, currentIndex, goToMovie }) {
    const goToPrev = _ => {
        goToMovie(currentIndex-1)
    }

    const goToNext = _ => {
        goToMovie(currentIndex+1)
    }

    return (
        <section className="selected-movie">
            <button 
                className="selected-movie__button"
                onClick={resetSelectedMovie}>Back to Results Page</button>
            <div className="selected-movie__container">
                <button 
                    className="selected-movie__button-prev"
                    disabled={currentIndex === 0 ? true : false}
                    onClick={goToPrev}>prev</button>
                <div className="selected-movie__details">                    
                    <div className="selected-movie__poster-container">
                        <img className="movie_poster" src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title + " poster"} />
                    </div>
                    <div className="selected-movie__details-container">
                        <p>
                            <strong>Title: </strong>
                            {movie.Title}
                        </p>
                        <p>
                            <strong>Actors: </strong>
                            {movie.Actors ? movie.Actors.toString() : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Language: </strong>
                            {movie.Language ? movie.Language : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Title: </strong>
                            {movie.Title ? movie.Title : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Country: </strong>
                            {movie.Country ? movie.Country : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Genre: </strong>
                            {movie.Genre ? movie.Genre : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Type: </strong>
                            {movie.Type ? movie.Type : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Released: </strong>
                            {movie.Released ? movie.Released : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Year: </strong>
                            {movie.Year ? movie.Year : errors.NOT_AVAILABLE}
                        </p>
                        <p>
                            <strong>Plot: </strong>
                            {movie.Plot ? movie.Plot : errors.NOT_AVAILABLE}
                        </p>
                    </div>
                </div>
                <button 
                    className="selected-movie__button-next"
                    disabled={results === currentIndex ? true : false }
                    onClick={goToNext}>next</button>
            </div>
        </section>
    )
}