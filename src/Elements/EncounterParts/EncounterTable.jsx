import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";



const EncTable = () => {
    const [encounterList, setEncounterList] = useState([])
    const [encounterName, setEncounterName] = useState('')
    const [showModal, setShowModal] = useState(false)


    const getEncounterTables = () => {
        //TODO fix the req.session so it saves the userId
        // const userId = useSelector(state => state.userId)
        const userId = 1

        axios.get(`/api/encounters/${userId}`)
            .then(res => setEncounterList(res.data))
            .catch(err => console.log(err))
    }

    const deleteEncounter = () => {
        axios.delete(`api/encounters/${encounter.encounterId}`)
        .then(res => {
            console.log(res)
            alert("Encounter Deleted!")
            getEncounterTables()
        })
        .catch(err => console.log(err))
    }
    
    const handleFormSubmit = e => {
        e.preventDefault()
        const userId = 1
        axios
        .post(`/api/encounters/${userId}`,{encounterName})
        .then(res => {
            console.log(res.data)
            alert("Encounter Created!")
            setShowModal(false)
            getEncounterTables()
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => { getEncounterTables() }, [])

    return (
        <div>--Encounters go here--
            <div >
                {encounterList.map(encounter => (
                    <div key={encounter.encounterId} className="border-solid border border-spacing-1 flex justify-between m-2">
                        <h2 className="font-bold capitalize text-lg">{encounter.encounterName}</h2>
                        <button onClick={deleteEncounter}>Delete</button>
                    </div>
                ))}
            </div>
            {showModal ? (
            <form onSubmit={e => handleFormSubmit(e)}>
                <h3>Create a new Encounter</h3>
                <input type="text" placeholder="Encounter Name" value={encounterName} onChange={e => setEncounterName(e.target.value)} />
                <select placeholder="Campaign">
                    {/* TODO render users existing campaigns and have an option for each */}
                    <option >Campy1</option>
                    <option >Campy2</option>
                </select>
                <button>Submit</button>
            </form>) 
            : (<button onClick={() => setShowModal(true)}>Create New Encounter</button>)}
            
        </div>
    )
}

export default EncTable