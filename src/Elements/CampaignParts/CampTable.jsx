import { useEffect, useState } from "react";
import axios from 'axios'
import PlayerRows from "./PlayerRows.jsx";
import NewCampForm from "./NewCampForm.jsx";
import React, { Component } from "react";





const CampTable = () => {
    const [campaignList, setCampaignList] = useState([])
    const [campaignName, setCampaignName] = useState('')
    const [showModal, setShowModal] = useState(false)

    const getCampaignTables = () => {
        axios.get('/api/campaigns')
            .then(res => setCampaignList(res.data))
            .catch(err => console.log(err))

    }
    useEffect(()=>{getCampaignTables()}, [])




    return (
        <div className="min-w-full text-xl ">
            <div>
                <div>
                    {campaignList.map(campaign => (
                        <PlayerRows key={campaign.campaignId} 
                        campaign={campaign} 
                        getCampaignTables={getCampaignTables} />
                    ))}
                </div>
            </div>
            {/* <NewCampButton/> */}
            {showModal ? (<NewCampForm 
            setCampaignName={setCampaignName}
            campaignName={campaignName}
            setShowModal={setShowModal}
            getCampaignTables={getCampaignTables}
            />) : (<button className="hover:text-blue-400" onClick={() => setShowModal(true)}>Create New Campaign</button>)}
        </div>
    )

}

export default CampTable