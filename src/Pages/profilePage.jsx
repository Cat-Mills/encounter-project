import React, { useEffect, useState } from 'react'
import LogoutButton from '../Elements/Logout.jsx'
import axios from 'axios'
import { useSelector } from 'react-redux'




//TODO create logout function/button. Make display for profile info.

const Profile = () => {
  const userId = useSelector(state => state.userId)
  const [userInfo, setUserInfo] = useState({})

  function getUser() {
    axios.get(`/api/user`)
      .then(res => {setUserInfo(res.data);console.log(res.data)})
      .catch(err => console.log(err))
  }
  useEffect(()=>{getUser()}, [])
  return (
<<<<<<< Updated upstream
    <div className='flex justify-center h-screen items-center'>
      <div className='mt-20 flex-col border border-solid p-3 bg-gray-700'>
        <h1 className='text-2xl mx-20 mt-5 mb-40'>Your Profile</h1>
        <div className='m-5 text-xl'>Username: {userInfo.username} </div>

        <div className='m-5 text-xl mt-52'><LogoutButton /></div>
      </div>
    </div>
=======
    <div>Profile Page</div>
>>>>>>> Stashed changes
  )
}

export default Profile