import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import MonstersInEnc from "./MonstersInEnc.jsx";
import { Trash, Edit, X, Play } from "../../icons.jsx";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "../DeleteAlert.jsx";



const EncTable = () => {
    const [encounterList, setEncounterList] = useState([])
    const [encounterName, setEncounterName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [usersCampaigns, setUsersCampaigns] = useState([])
    const [campaignKey, setCampaignKey] = useState(undefined)
    const [isEditing, setIsEditing] = useState('')
    const [viewAlert, setViewAlert] = useState('')

    const navigate = useNavigate()

    const getEncounterTables = () => {
        axios.get(`/api/encounters`)
            .then(res => setEncounterList(res.data))
            .catch(err => console.log(err))

    }
    useEffect(() => { getEncounterTables() }, [])


    const deleteEncounter = (viewAlert) => {
        axios.delete(`/api/encounters/${viewAlert}`)
            .then(res => {
                // console.log(res)

                getEncounterTables()
            })
            .catch(err => console.log(err))
    }

    const editEncounter = (encounter) => {
        // console.log(encounter.encounterId)
        axios
            .put(`/api/encounters/${encounter.encounterId}`, { encounterId: encounter.encounterId, encounterName: encounterName, campaignId: campaignKey })
            .then(res => {
                console.log("edits saved")
                // console.log(res.data)
                setIsEditing('')
                getEncounterTables()
            })
    }

    //create an encounter
    const handleAddEncounter = e => {
        e.preventDefault()
        axios
            .post(`/api/encounters`, { encounterName, campaignId: campaignKey })
            .then(res => {
                // console.log(res.data)

                setShowModal(false)
                getEncounterTables()
            })
            .catch(err => console.log(err))
    }
    const getCampaignTables = () => {
        axios.get('/api/campaigns')
            .then(res => {
                setUsersCampaigns(res.data)
                setCampaignKey(res.data[0] ? res.data[0].campaignId : null)
            })
            .catch(err => console.log(err))
    }

    const handleCampaignKey = e => {
        e.preventDefault()
        // console.log('hit handleCampaignKey')
        setCampaignKey(e.target.value)
        // console.log(campaignKey)
    }

    const startEncounter = (encounter) => {
        // console.log("hit start")
        // console.log(encounter.encounterName)
        navigate(`/active/${encounter.encounterId}`)
    }
    useEffect(() => { getCampaignTables() }, [])


    return (
        <div className="flex-col">
            {/* New Encounter Form */}
            {showModal ? (
                <form className="exeter text-base sm:text-xl" onSubmit={e => handleAddEncounter(e)}>
                    <h3>Create a new Encounter</h3>
                    <input className="py-1 sm:py-2 m-2 border border-solid placeholder:text-center " type="text" placeholder="New Encounter Name" value={encounterName} onChange={e => setEncounterName(e.target.value)} />

                    <div className=" inline-flex text-base sm:text-xl justify-center p-2">
                        <div className="w-min">Campaign: </div>
                        <select value={campaignKey} onChange={e => handleCampaignKey(e)} placeholder="Campaign">

                            {usersCampaigns.map(campaign => (
                                <option key={campaign.campaignId} value={campaign.campaignId}>{campaign.campaignName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center gap-x-6">
                        <button>Submit</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </form>
            )

                : (<button className="hover:border-blue-400 hover:text-blue-400 border border-solid border-grey-500 p-2 mb-2" onClick={() => setShowModal(true)}>Create New Encounter</button>)}

            {/* Encounter List */}
            <div className="flex-col" >
                {encounterList.map((encounter) => (
                    <div key={encounter.encounterId} className="border-2 flex justify-center my-2 sm:m-2 p-2 bg-gray-600 h-full relative"  >
                        <div className="flex flex-col h-auto justify-between w-full md:w-1/4">

                            <div className="flex flex-col">
                                {isEditing !== encounter.encounterId &&
                                    <div className=" text-start self-start z-30 p-2">
                                        <h2 className="font-bold capitalize text:lg sm:text-2xl">{encounter.encounterName}</h2>

                                        {encounter.enccamps.length > 0 ?
                                            (<p>{encounter.enccamps.map(encCampObj => (
                                                <span className="font-exeter text-base sm:text-lg text-gray-400" key={encCampObj.campaignId}> {encCampObj.campaign.campaignName}</span>
                                            ))}</p>) : (<p></p>)
                                        }
                                    </div>}
                                {isEditing === encounter.encounterId &&
                                    <div className="w-full sm:flex text-start bg-gray-600 z-30 py-2">
                                        <form className="font-bold capitalize text-lg w-full" onSubmit={e => { e.preventDefault(); editEncounter(encounter) }}>
                                            <input className="w-full bg-gray-700 text-center" type="text" placeholder="Encounter Name" value={encounterName} onChange={e => setEncounterName(e.target.value)} />
                                            <div className="mt-2 flex flex-col">
                                                <select className="border my-4 bg-transparent w-full flex-wrap" value={campaignKey} onChange={e => handleCampaignKey(e)} placeholder="Campaign">
                                                    {usersCampaigns.map(campaign => (
                                                        <option className="text-center bg-gray-700" key={campaign.campaignId} value={campaign.campaignId}>{campaign.campaignName}</option>
                                                    ))}
                                                </select>

                                                <button className="my-6 border hover:text-green-400">Save</button>

                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>

                            {/* TAB Encounter Buttons */}
                            <div className="flex">
                                {isEditing !== encounter.encounterId &&
                                    <div className="flex justify-start z-10 w-full gap-4">

                                        <button className="hover:text-blue-400  sm:self-center " title="Start Encounter" onClick={() => startEncounter(encounter)}><Play /></button>

                                        <button className="hover:text-blue-400  sm:self-center " title="Edit Encounter" onClick={() => { setIsEditing(encounter.encounterId); setEncounterName(encounter.encounterName) }}><Edit /></button>

                                        <button className="hover:text-red-400  sm:self-center" title="Delete Encounter" onClick={() => setViewAlert(encounter.encounterId)}><Trash /> </button>
                                    </div>
                                }
                                {isEditing === encounter.encounterId &&
                                    <div className="flex justify-start gap-2 z-10 md:self-center w-full">
                                        <button className="hover:text-blue-400  sm:self-center " title="Close without saving" onClick={() => setIsEditing("")}><X /></button>
                                        
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className="text-start z-20 self-center flex-1">
                        {
                            <MonstersInEnc key={encounter.encounterId}
                                encounter={encounter} />
                        }
                        </div>
                        <div className=" md:w-1/5 lg:w-1/4"></div>

                        {viewAlert === encounter.encounterId &&
                            <DeleteAlert viewAlert={viewAlert} setViewAlert={setViewAlert} deleteFunc={deleteEncounter} itemName={encounter.encounterName} />}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default EncTable