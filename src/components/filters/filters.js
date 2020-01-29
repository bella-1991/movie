import React, { useState } from 'react'

import { DefaultFilters as filters } from '../../constants';
import './filters.css'

export default function Filters ({ sort, sortChange, totalResults, type, typeChange }) {
    const [sortOptions, setSortOptions] = useState([{
                code: 'ASCE',
                value: 'Ascending'
            },{
                code: 'DESC',
                value: 'Descending'
            }]),
            [typeOptions, setType] = useState([{
                value: filters.TYPE
            },{
                value: 'movie'
            },{
                value: 'series'
            },{ 
                value: 'episode'
            }])
    
    return (
        <section className="filters">
            <div className="filters__results-label">-{totalResults} Results found -</div>
            <div className="filters__filter-container">
                <div className="filters__filter">
                    <label className="filters__label">Sort</label>
                    <select value={sort} onChange={e => sortChange(e.target.value)} className="pokedex__grid-select">
                        {sortOptions.map((option, key) => (
                                <option key={key} value={option.code}>{option.value}</option>
                            )
                        )}
                    </select>
                </div>
                <div className="filters__filter">
                    <label className="filters__label">Show Results</label>
                    <select value={type} onChange={e => typeChange(e.target.value)} className="pokedex__grid-select">                        
                        {typeOptions.map((option, key) => (
                                <option key={key} value={option.value}>{option.value}</option>
                            )
                        )}
                    </select>
                </div>
            </div>
        </section>
    )
}