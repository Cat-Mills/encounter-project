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
            
            setShowModal(false)
            getCampaignTables()
        })
        .catch(err => console.log(err))
    }

    return (
        <form className="exeter text-base sm:text-xl" onSubmit={e => handleFormSubmit(e)}>
            <h3 className="">Name Your New Campaign</h3>
            <input className="placeholder:text-center border m-2" type="text" placeholder="Campaign Name" value={campaignName} onChange={e => setCampaignName(e.target.value)}/>
            <div className="flex justify-center gap-x-6">
                <button>Submit</button>
                <button onClick={()=> setShowModal(false)}>Cancel</button>
            </div>
        </form>
    )
}