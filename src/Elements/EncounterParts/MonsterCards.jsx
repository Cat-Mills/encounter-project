import axios from "axios";
import { useState, useEffect } from "react";
import { Trash, More, ChevronRight } from "../../icons.jsx";
import StatBlock from "../MonsterParts/StatBlock.jsx";

export default function MonsterCards({ monsterUrl,monsterId, getMonsters }) {
    const [monsterStats, setMonsterStats] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showStatBlock, setShowStatBlock] = useState(false)

    async function getStats() {
        axios
            .get(`https://www.dnd5eapi.co${monsterUrl}`)
            .then(res => {
                setMonsterStats(res.data)
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const deleteMonster = () => {
        axios.delete(`/api/monsters/${monsterId}`)
        .then(res => {
            console.log(res)
            alert("monster removed")
            getMonsters()
        })
        .catch(err => console.log(err))
    }

    useEffect(() => { getStats() }, [])
    // console.log(showStatBlock)
    return(
        <div className="flex justify-around ">
            
            <button 
            onClick={() => {setShowModal(current => !current) }} 
            className="mr-3 my-1 hover:ring-gray-500 hover:text-blue-400 hover:ring-2 focus:ring-2 focus:ring-gray-300 focus: outline-none font-medium px-3 py-1 text-center inline-flex items-center justify-between " type="button">{monsterStats.name}<ChevronRight /></button>
            
            
            {showModal && 
            <div className="flex ">
                <button className="mr-2 hover:text-blue-400" onClick={() => {setShowStatBlock(current => !current) }} ><More/></button>

                <button className="ml-2 hover:text-blue-400" onClick={() => deleteMonster()}><Trash/> </button>
            </div>
            }
            {showStatBlock && 
            <div className="">
                <StatBlock url={monsterUrl} showBlock={true} />
            </div>
            }
        </div>
    )
}



