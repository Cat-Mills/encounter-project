import axios from "axios"
import { useEffect, useState } from "react"
import PlayerForm from "./PlayerForm.jsx"

const DisplayPlayers = ({player, campaign, getPlayerRows}) => {
    
    const [isEditing, setIsEditing] = useState(false)
    


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
            {!isEditing ?
            <div className="flex flex-row justify-evenly p-1">
                <div className="p-2"> {player.playerName} </div>
                <div className="p-2"> Lv: {player.playerLv} </div>
                <div className="p-2"> HP: {player.playerHP} </div>
                <div className="p-2"> AC: {player.playerAC} </div>
                <div className="p-2"> +{player.playerInit} initiative </div>
                <button onClick={() => setIsEditing(true)}>edit</button>
                <button onClick={() => deletePlayer()}>del</button>
            </div>
            :
            <div className="flex flex-row justify-evenly p-1">
                <PlayerForm
                setShowPlayerForm={setIsEditing}
                getPlayerRows={getPlayerRows}
                player={player}
                />
                {/* <button 
                onClick={() => {
                    setIsEditing(false)
                    }}
                >cancel</button> */}
            </div>
            }
        </div>
    )
}


export default DisplayPlayers