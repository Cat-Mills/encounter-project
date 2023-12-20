import axios from "axios"
import { useEffect, useState } from "react"
import { Trash, Edit, Check} from "../../icons.jsx"
import DeleteAlert from "../DeleteAlert.jsx"

const DisplayPlayers = ({player, campaign, getPlayerRows,setName,setLv,setHP,setAC,setInit,Name,Lv,HP,AC,Init}) => {
    
    const [isEditing, setIsEditing] = useState("")
    const [viewAlert, setViewAlert] = useState('')


    const deletePlayer = (viewAlert) => {
        axios.delete(`/api/players/${viewAlert}`)
        .then(res => {
            console.log(res)
            
            getPlayerRows()
        })
        .catch(err => console.log(err))
    }

    const editPlayer = (player) => {
        console.log(player.playerId)
        axios
            .put(`/api/players/${player.playerId}`, { 
                playerName: Name, 
                playerLv: Lv, 
                playerHP: HP, 
                playerAC: AC, 
                playerInit: Init})
            .then(res => {
                console.log("edits saved")
                console.log(res.data)
                setIsEditing(false)
                getPlayerRows()
            })
    }
    

    return(
        <div className="flex flex-col ">
            {isEditing !== player.playerId ?
            <div className="flex p-1 w-full items-center">
                <div className="p-2 w-1/6"> {player.playerName} </div>
                <div className="p-2 w-1/6"> Lv: {player.playerLv} </div>
                <div className="p-2 w-1/6"> HP: {player.playerHP} </div>
                <div className="p-2 w-1/6"> AC: {player.playerAC} </div>
                <div className="p-2 w-1/6"> +{player.playerInit} to initiative </div>
                <div className="p-2 w-1/6">
                    <button title="Edit Player" className="hover:text-blue-400 mr-6" onClick={() => {setIsEditing(player.playerId);
                        setName(player.playerName);
                        setLv(player.playerLv);
                        setHP(player.playerHP);
                        setAC(player.playerAC);
                        setInit(player.playerInit)
                        }}><Edit/></button>
                    <button title="Delete Player" className="hover:text-blue-400" onClick={() => {setViewAlert(player.playerId);console.log(viewAlert)}}><Trash/> </button>
                </div>
            </div>
            :
            <div className="flex flex-col w-full">
                <div className="flex items-center text-gray-400 mt-3 -mb-3 ">
                    <div className="w-1/6">Name</div>
                    <div className="w-1/6">Level</div>
                    <div className="w-1/6">Hit Points</div>
                    <div className="w-1/6">Armor Class</div>
                    <div className="w-1/6">Initiative</div>
                    <div className="w-1/6"></div>
                </div>
                <form className="font-bold capitalize w-full flex" onSubmit={e => {e.preventDefault();editPlayer(player)}}>
                    <input type="text" className="w-1/6 p-1 mx-0.5 my-3 text-center" defaultValue={Name} onChange={e => setName(e.target.value)}/>

                    <input type="text" className="w-1/6 p-1 mx-0.5 my-3 text-center" defaultValue={Lv} onChange={e => setLv(e.target.value)}/>

                    <input type="text" className="w-1/6 p-1 mx-0.5 my-3 text-center" defaultValue={HP} onChange={e => setHP(e.target.value)}/>

                    <input type="text" className="w-1/6 p-1 mx-0.5 my-3 text-center" defaultValue={AC} onChange={e => setAC(e.target.value)}/>

                    <input type="text" className="w-1/6 p-1 mx-0.5 my-3 text-center" defaultValue={Init} onChange={e => setInit(e.target.value)}/>
                    <div className="w-1/6 flex text-center">
                        <button className="m-3" type="submit" ><Check/></button>
                        <button className="m-1" onClick={() => setIsEditing("")}>Cancel</button>
                    </div>
                </form>
                
            </div>
            }
            {viewAlert === player.playerId && <DeleteAlert viewAlert={viewAlert} setViewAlert={setViewAlert} deleteFunc={deletePlayer} 
                itemName={player.playerName}/>}
        </div>
    )
}


export default DisplayPlayers