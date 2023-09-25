import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import MonsterCards from "./monsterCards.jsx";

export default function MonstersInEnc({encounter}){
    const [encountersMonsters, setEncountersMonsters] = useState([])
    const [monsterUrl, setMonsterUrl] = useState('')
    const [monsterStats, setMonsterStats] = useState({})

    const getMonsters = () => {
        axios.get(`/api/monsters/${encounter.encounterId}`)
            .then(res => {
                setEncountersMonsters(res.data)
            }).catch(err => console.log(err))
    }
    async function getStats() {
        encountersMonsters.map(monster => (
            setMonsterUrl(monster.monsterUrl)
        ))
        axios
            .get(`https://www.dnd5eapi.co${monsterUrl}`)
            .then(res => {
                setMonsterStats(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(()=>{getMonsters()}, [])
    
    // useEffect(() => { getStats() }, [])

    return(
        <div>
            {encountersMonsters.map(monster => (
                <div>
                    {monster.monsterUrl}
                </div>
            ))}
        </div>
    )
}
