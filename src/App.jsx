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

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' index element={userId ? <Navigate to='/campaigns'/> : <Landing />} />

        <Route path='/monsters' element={userId ? <Monsters/> : <Navigate to='/'/> }/>

        <Route path='/encounters' element={userId ? <Encounters/> : <Navigate to='/'/> }/>

        <Route path='/campaigns' element={userId ? <Campaigns/> : <Navigate to='/'/> }/>

        <Route path='/profile' element={userId ? <Profile/> : <Navigate to='/'/> }/>

        <Route path='/active/:id' element={<ActiveEncounters/>}/>
      </Routes>
    </>
  )
}

export default App
