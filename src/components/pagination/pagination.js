import React from 'react'

import { Settings as settings, API_Lables as label } from '../../constants';
import './pagination.css'

export default function Pagination ({ pages, currentPage, pageChange }) { 
    const getPages = _ => {
        const firstPage = 1,
                lastPage = pages > 0 ? pages : firstPage,
                previous = currentPage - firstPage,
                next = lastPage - currentPage

        let pagesList = [],
            nextPageToPrint,
            pageToStopPrinting

        // Print first Page
        if (firstPage === currentPage) {
            pagesList.push(<span className="pagination__span pagination__span--active">{currentPage}</span>)
        } else {
            pagesList.push(<button className="pagination__button" data-value={firstPage} onClick={e => pageChange(e)}>{firstPage}</button>)
        }
        
        // print prev pages
        if (previous <= 4) { 
            for (let i = firstPage+1; i <= previous; i++) {
                pagesList.push(<button key={i} className="pagination__button" data-value={i} onClick={e => pageChange(e)}>{i}</button>)
            }
        } else {
            nextPageToPrint = currentPage - 2;
            pagesList.push(<span className="pagination__span">...</span>)

            for (var i = nextPageToPrint; i < currentPage; i++) {
                pagesList.push(<button key={i} className="pagination__button" data-value={i} onClick={e => pageChange(e)}>{i}</button>)
            }
        }

        // Print current Page if not equal to first page
        if (currentPage !== firstPage) {
            pagesList.push(<span className="pagination__span pagination__span--active">{currentPage}</span>)
        }

        // print next pages
        if (next <= 4) { 
            for (var i = currentPage + 1; i < lastPage; i++) {
                pagesList.push(<button key={i} className="pagination__button" data-value={i} onClick={e => pageChange(e)}>{i}</button>)
            }

        } else if (next > 4) { // If there are more than 4 next pages, print the most recent two and dots
            pageToStopPrinting = currentPage + 2;

            for (var i = currentPage + 1; i <= pageToStopPrinting; i++) {
                pagesList.push(<button key={i} className="pagination__button" data-value={i} onClick={e => pageChange(e)}>{i}</button>)
            }

            pagesList.push(<span className="pagination__span pagination__span--more">...</span>)
        }

        // Print last Page
        if (pages !== currentPage) {
            pagesList.push(<button className="pagination__button" data-value={pages} onClick={e => pageChange(e)}>{pages}</button>)
        }

        return pagesList
    }

    return (
        <section className="pagination">
            <button className="pagination__button pagination__button--prev" data-value={1} onClick={e => pageChange(e)} disabled={currentPage === 1 ? true : false} >First</button>
                { getPages() }
                <button className="pagination__button pagination__button--next" data-value={pages} onClick={e => pageChange(e)} disabled={currentPage === pages? true : false}>Last</button>
        </section>
    )
}