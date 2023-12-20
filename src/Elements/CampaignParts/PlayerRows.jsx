import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayPlayers from "./DisplayPlayers.jsx";
import { Plus, X, Trash, Up, Down, BookmarkL, Check } from "../../icons.jsx";
import DeleteAlert from "../DeleteAlert.jsx"

export default function PlayerRows({ campaign, getCampaignTables }) {
    const navigate = useNavigate()

    const [showPlayers, setShowPlayers] = useState(false)
    const [playerRows, setPlayerRows] = useState([])
    const [playerName, setPlayerName] = useState('')
    const [playerLv, setPlayerLv] = useState('')
    const [playerHP, setPlayerHP] = useState('')
    const [playerAC, setPlayerAC] = useState('')
    const [playerInit, setPlayerInit] = useState('')
    const [showPlayerForm, setShowPlayerForm] = useState(false)
    const [viewAlert, setViewAlert] = useState('')

    const getPlayerRows = () => {
        axios.get(`/api/players/${campaign.campaignId}`)
            .then(res => setPlayerRows(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => { getPlayerRows() }, [])

    const addPlayer = () => {
        axios
            .post(`/api/players/${campaign.campaignId}`,
                { playerName, playerLv, playerHP, playerAC, playerInit }
            )
            .then(res => {
                console.log(res.data)

                getPlayerRows()
                clear()
            })
            .catch(err => {console.log(err)})
    }

    function clear() {
        setPlayerName('')
        setPlayerLv('')
        setPlayerHP('')
        setPlayerAC('')
        setPlayerInit('')
    }

    const deleteCampaign = (viewAlert) => {
        axios.delete(`/api/campaigns/${viewAlert}`)
            .then(res => {
                console.log(res),
                setViewAlert(''),
                getCampaignTables()
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="border-2 border-spacing-1 flex justify-end m-2 p-2 py-6 bg-gray-600 relative align-middle">
                <h2 className="font-bold capitalize text-2xl absolute left-4 self-center">{campaign.campaignName}</h2>
                <p className="flex self-center mr-6"> Players: {playerRows.length} </p>
                <button title="Delete Campaign" className="mx-4 hover:text-blue-400" onClick={()=> {setViewAlert(campaign.campaignId)}}><Trash /></button>
                {!showPlayers && <button title="Show Players" className="hover:text-blue-400 mr-2" onClick={() => { setShowPlayers(true) }}><Down /> </button>}
                {showPlayers && <button title="Hide Players" className="hover:text-blue-400 mr-2" onClick={() => setShowPlayers(false)}><Up /> </button>}
                {viewAlert === campaign.campaignId && <DeleteAlert viewAlert={viewAlert} setViewAlert={setViewAlert} deleteFunc={deleteCampaign} 
                itemName={campaign.campaignName}/>}
            </div>
            {showPlayers && playerRows[0] &&
            <div className=" border-solid border-2 mx-2">
                {playerRows.map(player =>
                (
                    <div className=" bg-gray-600 exeter" key={player.playerId}>
                        <DisplayPlayers
                            setShowPlayers={setShowPlayers}
                            player={player}
                            campaign={campaign}
                            getPlayerRows={getPlayerRows}
                            setName={setPlayerName}
                            setLv={setPlayerLv}
                            setHP={setPlayerHP}
                            setAC={setPlayerAC}
                            setInit={setPlayerInit}
                            Name={playerName}
                            Lv={playerLv}
                            HP={playerHP}
                            AC={playerAC}
                            Init={playerInit}
                        />
                    </div>))}
                    </div>}




            {showPlayers && !showPlayerForm &&
                <div className="relative mb-4">
                    <button className="hover:text-blue-400  mb-2 " onClick={() => setShowPlayerForm(true)}><Plus /><div title="Add a new player" className="absolute z-10 top-0 -mt-[9px] left-1/2 transform -translate-x-1/2"><BookmarkL/></div></button>
                    
                </div>
            }
            {showPlayerForm &&
                <div className="border border-spacing-1 flex-col mx-4 mb-4 p-1 exeter">
                    <form id="newPlayer" className="w-full flex" onSubmit={e => { addPlayer(e); setShowPlayerForm(false) }}>
                        
                        <input className=" w-1/6 py-1 my-3 text-center" type="text" placeholder="Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />

                        <input className=" w-1/6 py-1 my-3 text-center" type="text" placeholder="Level" value={playerLv} onChange={e => setPlayerLv(e.target.value)} />

                        <input className=" w-1/6 py-1 my-3 text-center" type="text" placeholder="HP" value={playerHP} onChange={e => setPlayerHP(e.target.value)} />

                        <input className=" w-1/6 py-1 my-3 text-center" type="text" placeholder="AC" value={playerAC} onChange={e => setPlayerAC(e.target.value)} />

                        <input className=" w-1/6 py-1 my-3 text-center" type="text" placeholder="Initiative Bonus" value={playerInit} onChange={e => setPlayerInit(e.target.value)} />

                        <div className="flex w-1/6 px-4">
                            <button className="m-3" type="submit" ><Check/></button>
                            <button className="m-3" onClick={() => setShowPlayerForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}