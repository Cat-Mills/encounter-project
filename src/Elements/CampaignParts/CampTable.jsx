import { useEffect, useState } from "react";
import axios from 'axios'
import Rows from "./Rows.jsx";
import NewCampForm from "./NewCampForm.jsx";
import TableHeader from "./TableHeader.jsx";
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
        <div>
            <div>
                <div>
                    <TableHeader />
                </div>
                <div>
                    {campaignList.map(campaign => (
                        <Rows campaign={campaign} />
                    ))}
                </div>
            </div>
            {/* <NewCampButton/> */}
            {showModal ? (<NewCampForm 
            setCampaignName={setCampaignName}
            campaignName={campaignName}
            setShowModal={setShowModal}
            />) : (<button onClick={() => setShowModal(true)}>Create New Campaign</button>)}
        </div>
    )

}

export default CampTable