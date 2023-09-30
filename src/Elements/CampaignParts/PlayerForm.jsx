import axios from "axios";
import { useState } from "react";
import React from "react";



export default function PlayerForm ({setShowPlayerForm, getPlayerRows, player}) {
    
    const [playerName, setPlayerName] = useState(player.playerName)
    const [playerLv, setPlayerLv] = useState(player.playerLv)
    const [playerHP, setPlayerHP] = useState(player.playerHP)
    const [playerAC, setPlayerAC] = useState(player.playerAC)
    const [playerInit, setPlayerInit] = useState(player.playerInit)
    
    const editPlayer = () => {
        axios
        .put(`/api/players/${player.playerId}`,
        {playerName, playerLv, playerHP, playerAC, playerInit}
        )
        .then(res => {
            console.log(res.data)
            
            getPlayerRows()
        })
    }
    
    

    return(
        <div>
<form onSubmit={e => {editPlayer(e) ; setShowPlayerForm(false)}}>
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
)}