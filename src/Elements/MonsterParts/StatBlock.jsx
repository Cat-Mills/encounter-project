import axios from "axios"
import { useState,useEffect } from "react"
import MonsterRows from "./MonsterRows.jsx"

export default function StatBlock({url}) {
const [monsterStats, setMonsterStats] = useState({})

    function getStats(){
    axios
    .get(`https://www.dnd5eapi.co${url}`)
    .then(res => {
        setMonsterStats(res.data)
    })
    .catch(err => console.log(err))
    }
    getStats()
    return(
        <div>
            <div>{monsterStats.size}</div>
            <div>{monsterStats.type} </div>
            <div>{monsterStats.alignment}</div>
        </div>
    )
}