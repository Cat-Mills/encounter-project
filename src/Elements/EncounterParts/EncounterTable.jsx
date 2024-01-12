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
            {showModal ? (
                <div>
                    <form className="exeter text-xl" onSubmit={e => handleAddEncounter(e)}>
                        <h3>Create a new Encounter</h3>
                        <input className="py-2" type="text" placeholder="New Encounter Name" value={encounterName} onChange={e => setEncounterName(e.target.value)} />
                        
                        <div >
                            <select value={campaignKey} onChange={e => handleCampaignKey(e)} placeholder="Campaign">
                                {usersCampaigns.map(campaign => (
                                    <option key={campaign.campaignId} value={campaign.campaignId}>{campaign.campaignName}</option>
                                ))}
                            </select>

                            <button className="ml-2">Submit</button>

                        </div>
                    </form>
                    <button onClick={()=> setShowModal(false)}>Cancel</button>
                </div>)
                : (<button className="hover:border-blue-400 hover:text-blue-400 border border-solid border-grey-500 p-2 mb-2" onClick={() => setShowModal(true)}>Create New Encounter</button>)}
            <div className="flex-col" >
                {encounterList.map((encounter) => (
                    <div key={encounter.encounterId} className="border border-spacing-1 flex justify-between items-center m-2 p-2 bg-gray-600 relative "  >
                        {isEditing !== encounter.encounterId && <div className=" w-28 text-start self-start z-30 p-2">
                            <h2 className="font-bold capitalize text-2xl leading-tight ">{encounter.encounterName}</h2>

                            {encounter.enccamps.length > 0 ?
                                (<p>{encounter.enccamps.map(encCampObj => (
                                    <span className="exeter text-base text-gray-400" key={encCampObj.campaignId}> {encCampObj.campaign.campaignName}</span>
                                ))}</p>) : (<p></p>)
                            }
                        </div>}
                        {isEditing === encounter.encounterId &&
                            <div className="w-28 text-start left-2">
                                <form className="font-bold capitalize text-lg w-20" onSubmit={e => { e.preventDefault(); editEncounter(encounter) }}>
                                    <input className=" bg-gray-700" type="text" placeholder="Encounter Name" value={encounterName} onChange={e => setEncounterName(e.target.value)} />
                                    <div >
                                        <select className=" bg-transparent" value={campaignKey} onChange={e => handleCampaignKey(e)} placeholder="Campaign">
                                            {usersCampaigns.map(campaign => (
                                                <option className=" bg-gray-700" key={campaign.campaignId} value={campaign.campaignId}>{campaign.campaignName}</option>
                                            ))}
                                        </select>

                                        <button>Save</button>

                                    </div>
                                </form>
                            </div>
                        }
                        <div className=" -ml-16 text-start z-20">
                            {
                                <MonstersInEnc key={encounter.encounterId}
                                    encounter={encounter} />
                            }
                        </div>
                        {/* TAB Buttons */}
                        {isEditing !== encounter.encounterId &&
                            <div className="flex z-10">

                                <button className="hover:text-blue-400 absolute self-center right-24" onClick={() => startEncounter(encounter)}><Play /></button>

                                <button className="hover:text-blue-400 absolute self-center right-14" onClick={() => {setIsEditing(encounter.encounterId); setEncounterName(encounter.encounterName)}}><Edit /></button>

                                <button className="hover:text-blue-400 absolute self-center right-4" onClick={() => setViewAlert(encounter.encounterId)}><Trash /> </button>
                            </div>
                        }
                        {isEditing === encounter.encounterId &&
                            <div className="flex">
                                <button className="hover:text-blue-400 absolute self-center right-14" onClick={() => setIsEditing("")}><X /></button>
                                <button className="hover:text-blue-400 absolute self-center right-4" onClick={() => {setViewAlert(encounter.encounterId)}}><Trash /> </button>
                            </div>
                        }
                        {viewAlert === encounter.encounterId && <DeleteAlert viewAlert={viewAlert} setViewAlert={setViewAlert} deleteFunc={deleteEncounter} 
                itemName={encounter.encounterName}/>}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default EncTable