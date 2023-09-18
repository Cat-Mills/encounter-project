import axios from "axios"
import { useEffect, useState } from "react"

const DisplayPlayers = ({setIsEditing, isEditing, player, setPlayerRows, campaign, getPlayerRows}) => {
    const [playerName, setPlayerName] = useState('')
    const [playerLv, setPlayerLv] = useState(null)
    const [playerHP, setPlayerHP] = useState(null)
    const [playerAC, setPlayerAC] = useState(null)
    const [playerInit, setPlayerInit] = useState(null)

    


    const deletePlayer = () => {
        axios.delete(`/api/players/${player.playerId}`)
        .then(res => {
            console.log(res)
            alert("Player Deleted!")
            getPlayerRows()
        })
        .catch(err => console.log(err))
    }

    

    return(
        <div className="flex flex-col">
            <div className="flex flex-row">
            {/* <div>Player1  lv:__ HP:__ AC:__ Init:__</div> */}
            <div> {player.playerName} </div>
            <button onClick={() => setIsEditing(true)}>edit</button>
            <button onClick={() => deletePlayer()}>del</button>
            </div>
            <div>
            </div>
        </div>
    )
}


export default DisplayPlayers