import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



export default function NewCampForm({campaignName, setCampaignName, setShowModal, getCampaignTables}) {

    // const userId = useSelector(state => state.userId)

    //axios func(like in landing page)
    const handleFormSubmit = e => {
        e.preventDefault()

        axios
        .post(`/api/campaigns`,{campaignName} )
        .then(res => {
            console.log(res.data)
            alert("Campaign Created!")
            setShowModal(false)
            getCampaignTables()
        })
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={e => handleFormSubmit(e)}>
            <h3>Create a New Campaign</h3>
            <input type="text" placeholder="Campaign Name" value={campaignName} onChange={e => setCampaignName(e.target.value)}/>
            <button>Submit</button>
        </form>
    )
}