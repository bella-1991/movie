import React, { useState, useEffect } from 'react'

import { Settings as settings, API_Lables as label } from './constants';
import Header from './components/header/header'
import Search from './components/search/search'
import './App.css'

function App() {
  const [title, setTitle] = useState("Cineworld - Your ultimate movie guide")
  const [selectedMovie, setSelectedMovie] = useState('')
  const [movieName, setMovieName] = useState('')
  const [data, setData] = useState({})
  
  const changeMovieName = name => {
    
  }

  useEffect(() => {
    const newData = {
      title: movieName
    }
    setData(newData)
  }, [movieName])

  return (
    <div className="app">
      <Header title={title} />
      <Search data={data} changeMovieName={changeMovieName} />
    </div>
  );
}

export default App;
