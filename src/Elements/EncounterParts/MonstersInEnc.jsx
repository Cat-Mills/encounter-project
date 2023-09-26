import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import MonsterCards from "./monsterCards.jsx";

export default function MonstersInEnc({encounter}){
    const [encountersMonsters, setEncountersMonsters] = useState([])
    const [monsterUrl, setMonsterUrl] = useState('')
    const [monsterStats, setMonsterStats] = useState([])

    // const getMonsters = async () => {
    //     const res = await axios.get(`/api/monsters/${encounter.encounterId}`)
    //     .catch(err => console.log(err))
    //     if(res.data){
    //         const monStats = []
    //         res.data.forEach(async (monster)=> {
    //             const stats = await axios.get(`https://www.dnd5eapi.co${monster.monsterUrl}`)
    //             .catch(err => console.log(err))
    //             // console.log(stats.data)
    //             monStats.push(stats.data)
    //         })
    //         setMonsterStats(monStats)
    //     }
    // }
    console.log(monsterStats)
    const getMonsters = () => {
        axios.get(`/api/monsters/${encounter.encounterId}`)
            .then(res => {
                setEncountersMonsters(res.data)
                // console.log(res.data)
            }).catch(err => console.log(err))
    }
    async function getStats() {
        const data = []
        encountersMonsters.map(monster => {
            axios
            .get(`https://www.dnd5eapi.co${monster.monsterUrl}`)
            .then(res => {
                // console.log(res.data)
                data.push(res.data)
            })
            .catch(err => console.log(err))
            })
            // console.log(data)
            setMonsterStats(data)
        }
    
    useEffect(()=>{getMonsters()}, [])
    
console.log(monsterStats)
    return(
        <div>
            {monsterStats[0] && monsterStats.map(monster => (
                <div key={monster.index}>
                    
                </div>
            ))}
        </div>
    )
}
