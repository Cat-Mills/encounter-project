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
    
    
    useEffect(()=>{getMonsters()}, [])
    
    return(
        <div className=" bg-gray-600 z-10">
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
