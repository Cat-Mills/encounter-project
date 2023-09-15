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



function App() {
  const userId = useSelector(state => state.userId)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={userId ? <Navigate to='/Encounters'/> : <Landing />} />

        <Route path='/monsters' element={userId ? <Monsters/> : <Navigate to='/'/> }/>

        <Route path='/Encounters' element={userId ? <Encounters/> : <Navigate to='/'/> }/>

        <Route path='/campaigns' element={userId ? <Campaigns/> : <Navigate to='/'/> }/>

        <Route path='/Profile' element={userId ? <Profile/> : <Navigate to='/'/> }/>
      </Routes>
    </>
  )
}

export default App
