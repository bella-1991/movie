import React from 'react'

import { Settings as settings, API_Lables as label } from '../../constants';
import './search.css'

export default function Search ({ data, changeMovieName }) {

    const updateFilters = value => {  
        console.log(value)
        // handleSearch(value)
    }

    return (
        <section>
            <div className="search">
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder="Type name to search ..."
                    value={data.title}
                    data-param={data}
                    onChange={e => updateFilters(e.target.value)} />
                <button className="search__button">Search</button>
            </div>
        </section>
    )
}