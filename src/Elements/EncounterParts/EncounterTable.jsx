import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import MonstersInEnc from "./MonstersInEnc.jsx";



const EncTable = () => {
    const [encounterList, setEncounterList] = useState([])
    const [encounterName, setEncounterName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [usersCampaigns, setUsersCampaigns] = useState([])
    const [campaignKey, setCampaignKey] = useState(undefined)
    
    
    
    
    const getEncounterTables = () => {
        axios.get(`/api/encounters`)
        .then(res => setEncounterList(res.data))
        .catch(err => console.log(err))
        
    }
    useEffect(() => { getEncounterTables() }, [])
    
//TODO fix deleteEncounter func(encounter is undefined)
    const deleteEncounter = (encounter) => {
        // console.log(encounterList)
        axios.delete(`/api/encounters/${encounter.encounterId}`)
        .then(res => {
            console.log(res)
            alert("Encounter Deleted!")
            getEncounterTables()
        })
        .catch(err => console.log(err))
    }
    //create an encounter
    const handleAddEncounter = e => {
        e.preventDefault()
        axios
        .post(`/api/encounters`,{encounterName, campaignId: campaignKey})
        .then(res => {
            console.log(res.data)
            alert("Encounter Created!")
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
        console.log('hit handleCampaignKey')
        setCampaignKey(e.target.value)
        console.log(campaignKey)
    }
    useEffect(()=>{getCampaignTables()}, [])
    
    
    // console.log(encounterList)

    return (
        <div>
            <div >
                {encounterList.map((encounter) => (
                    <div key={encounter.encounterId} className="border-solid border border-spacing-1 flex justify-between m-2 px-2">
                        <div>
                        <h2 className="font-bold capitalize text-lg">{encounter.encounterName}</h2>
                        
                        {encounter.enccamps.length > 0 ?
                        (<p>{encounter.enccamps.map(encCampObj=> (
                            <span key={encCampObj.campaignId}>{encCampObj.campaign.campaignName}</span>
                        ))}</p>) : (<p></p>)
                        } 
                        </div>
                        <div>
                            {
                            <MonstersInEnc key={encounter.encounterId}
                            encounter={encounter}/> 
                            }
                        </div>
                        <button onClick={() => deleteEncounter(encounter)}>Delete</button>
                    </div>
                ))}
            </div>
            {showModal ? (
            <form onSubmit={e => handleAddEncounter(e)}>
                <h3>Create a new Encounter</h3>
                <input type="text" placeholder="Encounter Name" value={encounterName} onChange={e => setEncounterName(e.target.value)} />
                    {/* TODO render users existing campaigns and have an option for each */}
                    <div >
                        <select value={campaignKey} onChange={e => handleCampaignKey(e)} placeholder="Campaign">
                        {usersCampaigns.map(campaign => (
                            <option key={campaign.campaignId}value={campaign.campaignId}>{campaign.campaignName}</option>
                        ))}
                        </select>

                        <button>Submit</button>
                        
                    </div>
            </form>) 
            : (<button onClick={() => setShowModal(true)}>Create New Encounter</button>)}
            
        </div>
    )
}

export default EncTable