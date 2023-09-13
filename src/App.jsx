import { useState } from 'react'
import './App.css'
import Header from "./Elements/Header"
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/landingPage.jsx'
import Monsters from './Pages/monstersPage.jsx'
import Encounters from './Pages/encountersPage.jsx'
import Campaigns from './Pages/campaignsPage.jsx'
import Profile from './Pages/profilePage.jsx'



function App() {

  return (
    <>
      <Header />
      <Routes>
        //TODO create routes
        <Route path='/' element={<Landing />}/>
        <Route path='/monsters' element={<Monsters/>}/>
        <Route path='/Encounters' element={<Encounters/>}/>
        <Route path='/Campaigns' element={<Campaigns/>}/>
        <Route path='/Profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
