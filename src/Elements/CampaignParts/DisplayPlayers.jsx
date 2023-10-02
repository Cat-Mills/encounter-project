import axios from "axios"
import { useEffect, useState } from "react"
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
            <div className="flex p-1 w-full">
                <div className="p-2 w-1/6"> {player.playerName} </div>
                <div className="p-2 w-1/6"> Lv: {player.playerLv} </div>
                <div className="p-2 w-1/6"> HP: {player.playerHP} </div>
                <div className="p-2 w-1/6"> AC: {player.playerAC} </div>
                <div className="p-2 w-1/6"> +{player.playerInit} to initiative </div>
                <div className="p-2 w-1/6">
                    <button className="hover:text-blue-400 mr-6" onClick={() => setIsEditing(true)}><Edit/></button>
                    <button className="hover:text-blue-400" onClick={() => deletePlayer()}><Trash/> </button>
                </div>
            </div>
            :
            <div>
                
                
            </div>
            }
        </div>
    )
}


export default DisplayPlayers