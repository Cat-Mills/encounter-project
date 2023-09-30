import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import CampTable from '../Elements/CampaignParts/CampTable.jsx'
import '../index.css'

const Campaigns = () => {
  return (
    <div className='border p-5 bg-gray-700 mt-32'>
      <CampTable/>
    </div>
  
  )
  
}

export default Campaigns