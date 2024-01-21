import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayPlayers from "./DisplayPlayers.jsx";
import { PlusAlt, X, Trash, Up, Down, Bookmark, Check } from "../../icons.jsx";
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
console.log(playerRows.length)
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
            .catch(err => { console.log(err) })
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
            <div className="border-2 border-spacing-1 flex flex-col sm:flex-row justify-end my-2 mb-0 p-2 py-6 bg-gray-600 relative align-middle">
                <h2 className="font-bold capitalize text-xl flex sm:text-2xl left-4 mr-auto">{campaign.campaignName}</h2>
                <div className="flex justify-end">
                    <div className="flex self-center mr-auto font-exeter"> Players: {playerRows.length} </div>
                    <button title="Delete Campaign" className="mx:2 sm:mx-4 hover:text-red-400 p-1" onClick={() => { setViewAlert(campaign.campaignId) }}><Trash /></button>
                    {!showPlayers && <button title="Show Players" className="hover:text-blue-400 sm:mr-2" onClick={() => { setShowPlayers(true) }}><Down /> </button>}
                    {showPlayers && <button title="Hide Players" className="hover:text-blue-400 mr-2" onClick={() => setShowPlayers(false)}><Up /> </button>}
                    {viewAlert === campaign.campaignId && <DeleteAlert viewAlert={viewAlert} setViewAlert={setViewAlert} deleteFunc={deleteCampaign}
                        itemName={campaign.campaignName} />}
                </div>
            </div>
            {showPlayers && playerRows[0] &&
                <div className=" border-2 border-t-0 mx-2">
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
                <div className="relative mb-6">
                    <button className="hover:text-blue-400  mb-2 " onClick={() => setShowPlayerForm(true)}>
                            <div className={`${!playerRows.length && 'absolute bottom-2 left-1/2 transform -translate-x-1/2'}`}><PlusAlt /></div>
                        <div title="Add a new player" className={`${!playerRows.length ? '-mt-[8px]' : '-mt-[8px]'} absolute z-10 top-0 left-1/2 transform -translate-x-1/2`}>
                            <Bookmark />
                        </div>
                    </button>

                </div>
            }
            {showPlayerForm &&
                <div className="border-2 border-spacing-1 border-t-0 flex-col mx-2 mb-4 exeter ">
                    <form id="newPlayer" className="w-full flex flex-col lg:flex-row lg:justify-between p-1 text-sm sm:text-base lg:text-lg" onSubmit={e => { addPlayer(e); setShowPlayerForm(false) }}>
                        <div className="flex justify-evenly text-center">
                            <input className="w-1/4 md:w-1/6 md:text-center" type="text" placeholder="Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />

                            <input className="w-1/6 md:text-center" type="text" placeholder="Level" value={playerLv} onChange={e => setPlayerLv(e.target.value)} />

                            <input className="w-1/6 md:text-center" type="text" placeholder="HP" value={playerHP} onChange={e => setPlayerHP(e.target.value)} />

                            <input className="w-1/6 md:text-center" type="text" placeholder="AC" value={playerAC} onChange={e => setPlayerAC(e.target.value)} />

                            <input className="w-1/4 md:w-1/6 lg:text-center" type="text" placeholder="Init Bonus" value={playerInit} onChange={e => setPlayerInit(e.target.value)} />
                        </div>

                        <div className="flex lg:w-1/6 px-4 self-center w-full justify-around">
                            <button className="m-2 hover:text-green-400" type="submit" ><Check /></button>
                            <button className="m-2 hover:text-red-400" onClick={() => setShowPlayerForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}