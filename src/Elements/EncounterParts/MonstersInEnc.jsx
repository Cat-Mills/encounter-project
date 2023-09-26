import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import MonsterCards from "./monsterCards.jsx";

export default function MonstersInEnc({encounter}){
    const [encountersMonsters, setEncountersMonsters] = useState([])
    const [monsterUrl, setMonsterUrl] = useState('')

    
    const getMonsters = () => {
        axios.get(`/api/monsters/${encounter.encounterId}`)
            .then(res => {
                setEncountersMonsters(res.data)
                // console.log(res.data)
            }).catch(err => console.log(err))
    }
    // async function getStats() {
    //     const data = []
    //     encountersMonsters.map(monster => {
    //         axios
    //         .get(`https://www.dnd5eapi.co${monster.monsterUrl}`)
    //         .then(res => {
    //             // console.log(res.data)
    //             data.push(res.data)
    //         })
    //         .catch(err => console.log(err))
    //         })
    //         // console.log(data)
    //     }
    
    useEffect(()=>{getMonsters()}, [])
    

    return(
        <div>
            {encountersMonsters.map(monster => (
                <div key={monster.monsterId}>
                    <MonsterCards 
                    monsterUrl={monster.monsterUrl}
                    monsterId={monster.monsterId}
                    getMonsters={getMonsters}
                    />
                </div>
            ))}
        </div>
    )
}
