import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import CampTable from '../Elements/CampaignParts/CampTable.jsx'
import '../index.css'

const Campaigns = () => {
  return (
    <div className='border px-2 py-5 sm:p-5 bg-gray-700 mt-32 mb-10'>
      <CampTable/>
    </div>
  
  )
  
}

export default Campaigns