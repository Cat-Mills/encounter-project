import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MonsterRows from "./MonsterRows.jsx"

export default function StatBlock({ url }) {
    const [monsterStats, setMonsterStats] = useState({})
    const [showMonsterStats, setShowMonsterStats] = useState(false)
    const [profs, setProfs] = useState({})

    async function getStats() {
        axios
            .get(`https://www.dnd5eapi.co${url}`)
            .then(res => {
                setMonsterStats(res.data)
                setProfs(res.data.proficiencies.map(prof => (
                    {save: prof.proficiency.name, val: prof.value}
                ))
                    )
            })
            .catch(err => console.log(err))
            // console.log(specs)
    }
    
    useEffect(() => { getStats() }, [])
                
return (
    <div>
        <div>
            {!showMonsterStats ?
                <button className="hover:text-gray-400" onClick={() => { setShowMonsterStats(!showMonsterStats); getStats()}}>details</button>
                :
                <div>
                    <button className="hover:text-gray-400" onClick={() => setShowMonsterStats(false)}>close</button>
                </div>}
        </div>

        {/*BOOK ~~~ ~~~ ~~~ Monster Details ~~~ ~~~ ~~~*/}

        {showMonsterStats && (
            <div className="flex-wrap m-2 p-2 justify-around">

                {/*TAB  Type/Alignment  */}
                <div className="flex justify-around mb-3 capitalize">
                    <div>{monsterStats.size} </div>
                    <div>{monsterStats.type} </div>
                    {monsterStats.subtype && <div>{monsterStats.subtype} </div>}
                    <div>{monsterStats.alignment} </div>
                </div>
                
                    <div className="cardLine"></div>

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
                    <div className="flex justify-evenly">
                    <div className="font-bold"> Speed: {monsterStats.speed.walk} </div>
                    {monsterStats.speed.fly && <div>(Fly: {monsterStats.speed.fly})</div>}
                    {monsterStats.speed.swim && <div>(Swim: {monsterStats.speed.swim})</div>}
                    {monsterStats.speed.climb && <div>(Climb: {monsterStats.speed.climb})</div>}
                    </div>
                </div>
                <div className="cardLine"></div>
                {/*TAB Ability Scores */}
                <div className="flex justify-around my-2">
                    <div className="font-bold">STR<div className="font-normal">{monsterStats.strength}</div></div>
                    <div className="font-bold">DEX<div className="font-normal">{monsterStats.dexterity}</div></div>
                    <div className="font-bold">CON<div className="font-normal">{monsterStats.constitution}</div></div>
                    <div className="font-bold">INT<div className="font-normal">{monsterStats.intelligence}</div></div>
                    <div className="font-bold">WIS<div className="font-normal">{monsterStats.wisdom}</div></div>
                    <div className="font-bold">CHA<div className="font-normal">{monsterStats.charisma}</div></div>
                </div>
                <div className="cardLine"></div>
                <div className="flex justify-start font-bold">Saving Throws:
                {profs.map((prof) => {
                    if(prof.save.includes("Saving")) {
                        return <div className="mx-2 font-normal" key={prof.save}>{prof.save.slice(13)} +{prof.val}</div>
                    } else {return}})}
                </div>
                <div className="flex justify-start font-bold">Skills:
                {profs.map((prof) => {
                    if(prof.save.includes("Skill")){
                        return <div className="mx-2 font-normal" key={prof.save}>{prof.save.slice(6)} +{prof.val} </div>
                    } else {return}})}
                </div>
                <div className="">{monsterStats.desc}</div>

            </div>)}
    </div>
)
    }