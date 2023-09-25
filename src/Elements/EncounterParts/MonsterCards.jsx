import axios from "axios";
import { useState, useEffect } from "react";
import MonstersInEnc from "./MonstersInEnc.jsx";

export default function MonsterCards({ url }) {
    const [monsterStats, setMonsterStats] = useState({})

    async function getStats() {
        axios
            .get(`https://www.dnd5eapi.co${url}`)
            .then(res => {
                setMonsterStats(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => { getStats() }, [])
    return(
        <div>
            <div>{monsterStats.name}</div>
        </div>
    )
}



