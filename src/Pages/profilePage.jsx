import React from 'react'
import LogoutButton from '../Elements/Logout.jsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'


//TODO create logout function/button. Make display for profile info.

const Profile = () => {

  

  return (
    <div>Your Profile
      <LogoutButton/>
    </div>
  )
}

export default Profile