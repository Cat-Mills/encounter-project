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
    const [playerLv, setPlayerLv] = useState('')
    const [playerHP, setPlayerHP] = useState('')
    const [playerAC, setPlayerAC] = useState('')
    const [playerInit, setPlayerInit] = useState('')
    const [showPlayerForm, setShowPlayerForm] = useState(false)

    const getPlayerRows = () => {
        axios.get(`/api/players/${campaign.campaignId}`)
            .then(res => setPlayerRows(res.data))
            .catch(err => console.log(err))
    }

    useEffect(()=>{getPlayerRows()}, [])
    
    const addPlayer = () => {
        axios
        .post(`/api/players/${campaign.campaignId}`,
        {playerName, playerLv, playerHP, playerAC, playerInit}
        )
        .then(res => {
            console.log(res.data)
            alert("Player Added!")
            getPlayerRows()
            clear()
        })
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

    function clear(){
        setPlayerName('')
        setPlayerLv('')
        setPlayerHP('')
        setPlayerAC('')
        setPlayerInit('')
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
                    campaign={campaign}
                    getPlayerRows={getPlayerRows}
                    />
                </div>))}
                
                {!showPlayers && <button onClick={() => {setShowPlayers(true)}}>v</button>}
                
            

            {showPlayers && 
            <div>
                <button onClick={() => setShowPlayerForm(true)}>+</button>
                <button onClick={() => setShowPlayers(false)}>X</button>
            </div>
            } 
            {showPlayerForm &&
            <form onSubmit={e => {addPlayer(e); setShowPlayerForm(false)}}>
            <h3>Create a new player</h3>
            <input type="text" placeholder="Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />
            <input type="text" placeholder="Level" value={playerLv} onChange={e => setPlayerLv(e.target.value)} />
            <input type="text" placeholder="HP" value={playerHP} onChange={e => setPlayerHP(e.target.value)} />
            <input type="text" placeholder="AC" value={playerAC} onChange={e => setPlayerAC(e.target.value)} />
            <input type="text" placeholder="Initiative Bonus" value={playerInit} onChange={e => setPlayerInit(e.target.value)} />

            <button type="submit" >Submit</button>
            <button onClick={() => setShowPlayerForm(false)}>Cancel</button>
        </form>}
        </div>
    )
}