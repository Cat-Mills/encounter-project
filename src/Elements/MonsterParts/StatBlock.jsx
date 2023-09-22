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
    // console.log(monsterStats.armor_class)
    }
    useEffect(() => {getStats()}, [])

    return(
        <div>
        <div>
            {!showMonsterStats ?
            <button className="hover:text-gray-400" onClick={() => {setShowMonsterStats(!showMonsterStats) ; getStats()}}>details</button>
            :
            <div>
                <button className="hover:text-gray-400" onClick={() => setShowMonsterStats(false)}>close</button>
            </div>}
        </div>
            {showMonsterStats && (
            <div className="flex-wrap m-2 p-2 justify-start space-x-2">

{/*BOOK ~~~ ~~~ ~~~ Monster Details ~~~ ~~~ ~~~*/}

{/*TAB  Type/Alignment  */}
                <div className="flex justify-around mb-3 border-b-2 border-solid capitalize">
                    <div>{monsterStats.size} </div>
                    <div>{monsterStats.type} </div>
                    {monsterStats.subtype && <div>{monsterStats.subtype} </div>}
                    <div>{monsterStats.alignment} </div>
                </div>
                
{/*TAB  Armor */}
                <div>
                    <div className="flex justify-center font-bold">Armor Class: {(monsterStats.armor_class[0].value)} 
                    {monsterStats.armor_class[0].type && <div className="capitalize pl-1 font-normal italic">({monsterStats.armor_class[0].type})</div>}
                    </div>

{/*TAB Hit Points */}
                    <div className="font-bold flex justify-center">HP: {monsterStats.hit_points} 
                    <div className="font-normal italic ml-1">({monsterStats.hit_points_roll})</div>
                    </div>

{/*TAB Speed */}
                    <div> Speed: {monsterStats.speed.walk} </div>
                    {monsterStats.speed.fly && <div>(Fly: {monsterStats.speed.fly})</div>}
                    {monsterStats.speed.swim && <div>(Swim: {monsterStats.speed.swim})</div>}
                    {monsterStats.speed.climb && <div>(Climb: {monsterStats.speed.climb})</div>}
                    
                </div>
                <div className="">{monsterStats.desc}</div>
                    
            </div>)}
        </div>
    )
}