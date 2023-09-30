import axios from "axios"
import { useEffect, useState } from "react"
import PlayerForm from "./PlayerForm.jsx"
import { Trash, Edit} from "../../icons.jsx"

const DisplayPlayers = ({player, campaign, getPlayerRows}) => {
    
    const [isEditing, setIsEditing] = useState(false)
    


    const deletePlayer = () => {
        axios.delete(`/api/players/${player.playerId}`)
        .then(res => {
            console.log(res)
            
            getPlayerRows()
        })
        .catch(err => console.log(err))
    }

    

    return(
        <div className="flex flex-col">
            {!isEditing ?
            <div className="flex flex-row justify-between p-1">
                <div className="p-2"> {player.playerName} </div>
                <div className="p-2"> Lv: {player.playerLv} </div>
                <div className="p-2"> HP: {player.playerHP} </div>
                <div className="p-2"> AC: {player.playerAC} </div>
                <div className="p-2"> +{player.playerInit} to initiative </div>
                <button className="hover:text-blue-400 -mr-20" onClick={() => setIsEditing(true)}><Edit/></button>
                <button className="mr-2 hover:text-blue-400" onClick={() => deletePlayer()}><Trash/> </button>
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