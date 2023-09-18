import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayPlayers from "./DisplayPlayers.jsx";

export default function CampRows({campaign, getCampaignTables}){
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [showPlayers, setShowPlayers] = useState(false)
    const [playerRows, setPlayerRows] = useState([])

    const getPlayerRows = () => {
        axios.get(`/api/players/${campaign.campaignId}`)
            .then(res => setPlayerRows(res.data))
            .catch(err => console.log(err))
    }
    useEffect(()=>{getPlayerRows()}, [])

    const addPlayer = (e) => {
        e.preventDefault()
        axios
        .post(`/api/players/${campaign.campaignId}`,
        {playerName}
        )
    }


    const deleteCampaign = () => {
        axios.delete(`/api/campaigns/${campaign.campaignId}`)
        .then(res => {
            console.log(res) 
            alert("Campaign Deleted!")
            getCampaignTables()
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <div className="border-solid border border-spacing-1 flex justify-between">
                <h2>{campaign.campaignName}</h2>
                {/* <p> Players: array.length </p> */}
                <button onClick={deleteCampaign}>Delete</button>
            </div>
                {showPlayers && playerRows[0] && 
                playerRows.map(player => 
                (
                    
                <div key={player.playerId}>
                    <DisplayPlayers  
                    setShowPlayers={setShowPlayers}
                    player={player} 
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    campaign={campaign}
                    getPlayerRows={getPlayerRows}
                    />
                </div>))}
                
                {!showPlayers && <button onClick={() => {setShowPlayers(true)}}>v</button>}
                
            

            {showPlayers && 
            <div>
                <button >add</button>
                <button onClick={() => setShowPlayers(false)}>X</button>
            </div>
            } 
        </div>
    )
}