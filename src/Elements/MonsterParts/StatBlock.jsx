import axios from "axios"
import { useState,useEffect } from "react"
import MonsterRows from "./MonsterRows.jsx"

export default function StatBlock({url}) {
const [monsterStats, setMonsterStats] = useState({})
const [showMonsterStats, setShowMonsterStats] = useState(false)

    async function getStats(){
    axios
    .get(`https://www.dnd5eapi.co${url}`)
    .then(res => {
        setMonsterStats(res.data)
    })
    .catch(err => console.log(err))
    }
    
    return(
        <div>
            {!showMonsterStats ?
                    <button onClick={() => {setShowMonsterStats(!showMonsterStats) ; getStats()}}>details</button>
                    :
                    <div>
                        <button onClick={() => setShowMonsterStats(false)}>close</button>
                    </div>}
            {showMonsterStats && (
            <div>
                <div>{monsterStats.size}</div>
                <div>{monsterStats.type} </div>
                <div>{monsterStats.alignment}</div>
            </div>)}
        </div>
    )
}