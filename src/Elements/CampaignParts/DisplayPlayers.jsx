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
        <div className="flex flex-col text-base sm:text-xl border border-dashed border-x-0">
            {isEditing !== player.playerId ?
            <div className="flex flex-col p-1 w-full">
                <div className="flex w-full justify-between sm:p-2 my-2 sm:my-0"> {player.playerName} 
                
                    <div className="sm:p-2 sm:w-1/6 flex justify-end gap-4">
                        <button title="Edit Player" className="hover:text-blue-400 " onClick={() => {setIsEditing(player.playerId);
                            setName(player.playerName);
                            setLv(player.playerLv);
                            setHP(player.playerHP);
                            setAC(player.playerAC);
                            setInit(player.playerInit)
                        }}><Edit/></button>
                        <button title="Delete Player" className="hover:text-blue-400" onClick={() => {setViewAlert(player.playerId);console.log(viewAlert)}}><Trash/> </button>
                    </div>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <div className="flex sm:p-2 sm:w-1/6"> Lv: {player.playerLv} </div>
                    <div className="flex sm:p-2 sm:w-1/6"> HP: {player.playerHP} </div>
                    <div className="flex sm:p-2 sm:w-1/6"> AC: {player.playerAC} </div>
                    <div className="flex sm:p-2 sm:w-1/6"> +{player.playerInit} to initiative </div>
                </div>
            </div>
            :
            <div className="flex flex-col w-full text-sm sm:text-base">
                {/* <div className="flex justify-center text-gray-400 mt-3 -mb-3 gap-1 ">
                    <div className="w-1/6 ">Name</div>
                    <div className="w-1/6">Level</div>
                    <div className="w-1/6">HP</div>
                    <div className="w-1/6">AC</div>
                    <div className="w-1/6">Init</div>
                    
                </div> */}
                <form className="font-bold capitalize w-full flex flex-col sm:flex-row p-2" onSubmit={e => {e.preventDefault();editPlayer(player)}}>
                    <div className="flex">
                        <div className=" mx-0.5 text-center text-gray-400 flex flex-col">Name
                            <input type="text" className="text-center w-full" defaultValue={Name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className=" mx-0.5 text-center text-gray-400 flex flex-col">Level
                            <input type="text" className="text-center w-full" defaultValue={Lv} onChange={e => setLv(e.target.value)}/>
                        </div>

                        <div className=" mx-0.5 text-center text-gray-400 flex flex-col">HP
                            <input type="text" className="text-center w-full" defaultValue={HP} onChange={e => setHP(e.target.value)}/>
                        </div>

                        <div className=" mx-0.5 text-center text-gray-400 flex flex-col">AC
                            <input type="text" className="text-center w-full" defaultValue={AC} onChange={e => setAC(e.target.value)}/>
                        </div>

                        <div className=" mx-0.5 text-center text-gray-400 flex flex-col">Init
                            <input type="text" className="text-center w-full" defaultValue={Init} onChange={e => setInit(e.target.value)}/>
                        </div>
                    </div>
                    <div className=" flex text-center justify-center">
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