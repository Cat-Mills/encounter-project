import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import StatBlock from "./StatBlock"
import { ChevronLeft, ChevronRight, Plus } from "../../icons"


export default function MonsterRows({monsterList, itemsPerPage}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [encounterKey, setEncounterKey] = useState(undefined)
    const [usersEncounters, setUsersEncounters] = useState([])
    const [showModal, setShowModal] = useState(false)


    const totalPages = Math.ceil(monsterList.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = monsterList.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleAddToEncounter = (e, monsterUrl) => {
        e.preventDefault()
        axios.post(`/api/monsters/${encounterKey}`, {monsterUrl,  encounterId: encounterKey})
        .then(res => {
            console.log(res.data)
            alert("Monster added!")
            setShowModal(false)
            getEncounterTables()
        }).catch(err => console.log(err))
    }

    function getEncounterTables() {
        axios.get('/api/encounters')
            .then(res => {
                setUsersEncounters(res.data)
                setEncounterKey(res.data[0] ? res.data[0].encounterId : null)
            }).catch(err => console.log(err))
    }
    const handleEncounterKey = e => {
        e.preventDefault()
        console.log('hit handleEncounterKey')
        setEncounterKey(e.target.value)
        console.log(encounterKey)
    }
    useEffect(() => { getEncounterTables() }, [])

return(
<div>

    {currentItems.map((monster) => (
        <div key={monster.url}>
            <div className="border-solid border m-2">
                <div className="border-solid border border-spacing-1 flex justify-between m-1 p-2 bg-gray-700 ">
                <h2 className="font-bold capitalize text-lg">{monster.name} </h2>
                {showModal ? (
                    <form className="flex mx-1" onSubmit={e => handleAddToEncounter(e, monster.url)}> 
                    <select value={encounterKey} onChange={e => handleEncounterKey(e)} placeholder="Encounter">
                    {usersEncounters.map(encounter => (
                        <option key={encounter.encounterId} value={encounter.encounterId}>{encounter.encounterName}</option>
                    ))}
                    </select>
                    <button className="mx-2">Add</button>
                    <button onClick={() => setShowModal(false)}>cancel</button> </form>
                ) :
                <button onClick={() => setShowModal(true)} className=" hover:bg-gray-500"><Plus/></button>
                }
                </div>
                <StatBlock url={monster.url} />
            </div>
        </div>
    ))}

{/* Page navigation tabs */}
    <div className="flex gap-2 justify-around mx-14 my-4">
        <button className={currentPage === 1 ? `text-gray-500`: ``} onClick={previousPage} disabled={currentPage === 1}><ChevronLeft/></button>
        {Array.from({ length: totalPages }).map((_, index) => (
            <div key={index} className="">
                <button className={index+1===currentPage?`text-blue-400`:``} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
            </div>
        ))}
        <button className={currentPage === totalPages ? `text-gray-500`: ``} onClick={nextPage} disabled={currentPage === totalPages} ><ChevronRight/></button>
    </div>
</div>
    )
}

