import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

//TODO Make a calculator for CR, XP, and initiative 

export default function Calculators({monsters}){
    const [monsterXP, setMonsterXP] = useState([])
    const [monsterCR, setMonsterCR] = useState([])
    // const [totalXP, setTotalXP] = useState(0)

    async function getStats() {
        try{
        let responses = []
        let xpContainer = []
        let crContainer = []
        for(let monster of monsters) {
            const result = (await axios.get(`https://www.dnd5eapi.co${monster.monsterUrl}`))
            responses.push(result.data)
            xpContainer.push(result.data.xp)
            crContainer.push(result.data.challenge_rating)
            // console.log(result.data.challenge_rating)
        }
        setMonsterCR(crContainer)
        setMonsterXP(xpContainer)
        calculateXP()
    } catch(err){ console.log(err)}

    function calculateXP(){
        console.log('hit calc')
        
        let sum = 0
        monsterXP.forEach(num => {setTotalXP(sum += num)})
    }
}
useEffect(() => { getStats() }, [])
// useEffect(()=> { }, [])
// {monsterXP && console.log(monsterXP)}
// {monsterCR && console.log(monsterCR)}
// console.log(monsterXP)

    // calculateXP()

    return (
        <div>Total xp: {monsterXP.reduce((totalXP, value)=> value + totalXP, 0)} </div> 
    )
}