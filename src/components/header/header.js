import React from 'react'

import './header.css'

export default function Header ({ title }) {
    return (
        <header className="header">
            <img className="header__logo" src="https://picsum.photos/id/30/250/120" />
            <p className="header__tag-line">{title}</p>
        </header>
    )
}