import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayPlayers from "./DisplayPlayers.jsx";
import PlayerForm from "./PlayerForm.jsx";
import { Plus, X, Trash, Up, Down } from "../../icons.jsx";

export default function PlayerRows({campaign, getCampaignTables}){
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

    function clear(){
        setPlayerName('')
        setPlayerLv('')
        setPlayerHP('')
        setPlayerAC('')
        setPlayerInit('')
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
            <div className="border border-spacing-1 flex justify-end m-2 p-2 bg-gray-600 relative align-middle">
                <h2 className="font-bold capitalize text-lg absolute left-4 self-center">{campaign.campaignName}</h2>
                <p className="flex self-center mr-6"> Players: {playerRows.length} </p>
                <button className="mx-4 hover:text-blue-400" onClick={deleteCampaign}><Trash/></button>
                {!showPlayers && <button className="hover:text-blue-400 mr-2" onClick={() => {setShowPlayers(true)}}><Down/> </button>}
                {showPlayers && <button className="hover:text-blue-400 mr-2" onClick={() => setShowPlayers(false)}><Up/> </button>}
            </div>
                {showPlayers && playerRows[0] && 
                playerRows.map(player => 
                (
                    
                <div className=" bg-gray-600 mx-4 mb-1" key={player.playerId}>
                    <DisplayPlayers  
                    setShowPlayers={setShowPlayers}
                    player={player} 
                    campaign={campaign}
                    getPlayerRows={getPlayerRows}
                    />
                </div>))}
                
                
            

            {showPlayers && 
            <div>
                <button className="hover:text-blue-400" onClick={() => setShowPlayerForm(true)}><Plus/></button>
            </div>
            } 
            {showPlayerForm &&
            <div>
                
                <form onSubmit={e => {addPlayer(e) ; setShowPlayerForm(false)}}>
    <h3>Create a new player</h3>
    <input type="text" placeholder="Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />

    <input type="text" placeholder="Level" value={playerLv} onChange={e => setPlayerLv(e.target.value)} />

    <input type="text" placeholder="HP" value={playerHP} onChange={e => setPlayerHP(e.target.value)} />

    <input type="text" placeholder="AC" value={playerAC} onChange={e => setPlayerAC(e.target.value)} />

    <input type="text" placeholder="Initiative Bonus" value={playerInit} onChange={e => setPlayerInit(e.target.value)} />

    <button type="submit" >Submit</button>
    <button onClick={() => setShowPlayerForm(false)}>Cancel</button>
</form>
            </div>
}
        </div>
)
}