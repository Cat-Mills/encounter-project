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
    function getAC(){
        monsterStats.armor_class.map(armor)
        return [armor.type,armor.value].join(" ")}
        // console.log(getAC())
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
                {/* TAB Top line stats  */}
                <div className="flex justify-around mb-3 border-b-2 border-solid capitalize">
                    <div>{monsterStats.size} </div>
                    <div>{monsterStats.type} </div>
                    {monsterStats.subtype && <div>{monsterStats.subtype} </div>}
                    <div>{monsterStats.alignment} </div>
                </div>
                {/* TAB Mid line Stats */}
                <div className="font-bold">
                    {/* <div>{console.log(monsterStats.armor_class)}</div> */}
                    <div>HP: {monsterStats.hit_points} ({monsterStats.hit_points_roll})</div>
                    <div>Speed: </div>
                    
                </div>
                <div className="">{monsterStats.desc}</div>
                    
            </div>)}
        </div>
    )
}