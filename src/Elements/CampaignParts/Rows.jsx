import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayPlayers from "./DisplayPlayers.jsx";

export default function CampRows({campaign, getCampaignTables}){
    const navigate = useNavigate()
    const [showPlayers, setShowPlayers] = useState(false)
    const [playerRows, setPlayerRows] = useState([])
    const [playerName, setPlayerName] = useState('')
    const [playerLv, setPlayerLv] = useState(null)
    const [playerHP, setPlayerHP] = useState(null)
    const [playerAC, setPlayerAC] = useState(null)
    const [playerInit, setPlayerInit] = useState(null)

    const deleteCampaign = () => {
        axios.delete(`/api/campaigns/${campaign.campaignId}`)
        .then(res => {
            console.log(res) 
            alert("Campaign Deleted!")
            getCampaignTables()
        })
        .catch(err => console.log(err))
    }

    const getPlayerRows = () => {
        axios.get('/api/players')
            .then(res => setPlayerRows(res.data))
            .catch(err => console.log(err))
    }

    useEffect(()=>{getPlayerRows()}, [])


    const AddPlayer = () => {

    }

    return(
        <div>
            <div className="border-solid border border-spacing-1 flex justify-between">
                <h2>{campaign.campaignName}</h2>
                {/* <p> Players: array.length </p> */}
                <button onClick={deleteCampaign}>Delete</button>
            </div>
                {showPlayers ? 
                // playerRows.map(player => 
                (
                    <DisplayPlayers setShowPlayers={setShowPlayers}
                    // key={player.playerId} player={player} getPlayerRows={getPlayerRows} 
                    />
                    )
                // )
                : 
                (<button onClick={() => setShowPlayers(true)}>v</button>) }

        </div>
    )
}