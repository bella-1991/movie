import React, { useState } from 'react'

import { Settings as settings, API_Lables as label } from '../../constants';
import './search.css'

export default function Search ({ setMovieData }) {    
    const [movieName, setMovieName] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        if (!movieName) return
        setMovieData(movieName)
    }

    return (
        <section>
            <div className="search">
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder="Type name to search ..."
                    value={movieName}
                    onChange={e => setMovieName(e.target.value)} />
                <button 
                    className="search__button"
                    onClick={handleSubmit}>Search</button>
            </div>
        </section>
    )
}