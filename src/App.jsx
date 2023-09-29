import { useState } from 'react'
import './App.css'
import Header from "./Elements/Header"
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Landing from './Pages/landingPage.jsx'
import Monsters from './Pages/monstersPage.jsx'
import Encounters from './Pages/encountersPage.jsx'
import Campaigns from './Pages/campaignsPage.jsx'
import Profile from './Pages/profilePage.jsx'
import ActiveEncounters from './Pages/ActiveEncounterPage'



function App() {
  const userId = useSelector(state => state.userId)
  // console.log(userId)
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' index element={ <Landing />} />

        <Route path='/monsters' element={ <Monsters/> }/>

        <Route path='/encounters' element={<Encounters/> }/>

        <Route path='/campaigns' element={<Campaigns/> }/>

        <Route path='/profile' element={<Profile/> }/>

        <Route path='/active/:id' element={<ActiveEncounters/>}/>
      </Routes>
    </>
  )
}

export default App
