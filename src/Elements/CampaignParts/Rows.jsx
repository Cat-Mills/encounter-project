import { useState } from "react";
import React from "react";
import axios from "axios";

export default function CampRows({campaign}){

    const deleteCampaign = () => {
        axios.delete(`/api/campaigns/${campaign.campaignId}`)
        .then(res => {
            console.log(res) 
            alert("Campaign Deleted!")
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="border-solid border border-spacing-1 flex">
            <h2>{campaign.campaignName}</h2>
            <p>  </p>
            <button onClick={deleteCampaign}>Delete</button>
        </div>
    )
}