import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MonsterRows from "./MonsterRows.jsx"
import { More, Plus, X, Down, Up } from "../../icons.jsx"

export default function StatBlock({ url, showBlock }) {
    const [monsterStats, setMonsterStats] = useState({})
    const [showMonsterStats, setShowMonsterStats] = useState(false)
    const [profs, setProfs] = useState({})
    const [specials, setSpecials] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [encounterKey, setEncounterKey] = useState(undefined)
    const [usersEncounters, setUsersEncounters] = useState([])
    const [monsterImage, setMonsterImage] = useState('')

    async function getStats() {
        let getImg = ''
        // console.log(url)
        axios
            .get(`https://www.dnd5eapi.co${url}`)
            .then(res => {
                setMonsterStats(res.data)
                setProfs(res.data.proficiencies.map(prof => (
                    {save: prof.proficiency.name, val: prof.value}
                    )))
                setSpecials(res.data.special_abilities.map(special => (
                    {name: special.name, desc: special.desc}
                    )))
                getImg = res.data.image ? res.data.image : null
                // console.log(res.data)
                if(showBlock){
                    setShowMonsterStats(true)
                }
                if(getImg){setMonsterImage(`https://www.dnd5eapi.co${getImg}`)} else {setMonsterImage(null)}
            })
            .catch(err => console.log(err))
    }
    function getEncounterTables() {
        axios.get('/api/encounters')
            .then(res => {
                // console.log("logging encounters")
                setUsersEncounters(res.data)
                setEncounterKey(res.data[0] ? res.data[0].encounterId : null)
            }).catch(err => console.log(err))
    }
    const handleEncounterKey = e => {
        e.preventDefault()
        console.log('hit handleEncounterKey')
        setEncounterKey(e.target.value)
        console.log(encounterKey)
    }
    const handleAddToEncounter = (e) => {
        e.preventDefault()
        console.log("hit addToEncounter")
        // e.preventDefault()
        axios.post(`/api/monsters/${encounterKey}`, {monsterUrl: url,  encounterId: encounterKey})
        .then(res => {
            console.log(res.data)
            
            setShowModal(false)
            // getEncounterTables()
        }).catch(err => console.log(err))
    }
    useEffect(() => { getStats(), getEncounterTables() }, [])
    // console.log(monsterStats)
return (
    <div>
        {!showBlock && <div className="flex relative w-11/12 ml-8">
            {!showMonsterStats ?
                <button className="hover:text-blue-400 flex absolute justify-center  bottom-4 left-full" onClick={() => { setShowMonsterStats(!showMonsterStats); getStats(); console.log(monsterStats); console.log()}}><Down/></button>
                :
                <div>
                    <button className="hover:text-blue-400 flex absolute justify-center bottom-4 left-full" onClick={() => setShowMonsterStats(false)}><Up/></button>
                </div>
            }
        </div>}

        {showModal ? (
            <div className="flex relative w-11/12 -ml-3 ">
                <button className=" flex absolute justify-center left-full bottom-4 hover:text-blue-400" onClick={() => setShowModal(false)}><X/> </button> 

                <form className="ml-16 flex absolute justify-center bottom-4 left-3/4" onSubmit={(e) =>{console.log(url) ; handleAddToEncounter(e,"asdf"); }}> 
                    <button type="submit" className="mr-2 hover:text-blue-400">Add to</button>

                    <select className=" bg-gray-700 focus: outline-none" value={encounterKey} onChange={e => {handleEncounterKey(e)}} placeholder="Encounter">

                    {usersEncounters.map(encounter => (
                        <option key={encounter.encounterId} value={encounter.encounterId}>{encounter.encounterName}</option>
                    ))}

                    </select>
                </form>
        </div> 
        ) :
        <div className="flex relative w-11/12 -ml-3">
            {!showBlock && <button onClick={() => setShowModal(true)} className="flex absolute justify-center left-full bottom-4 hover:text-blue-400"><Plus/></button>}
        </div>
        }

        {/*BOOK ~~~ ~~~ ~~~ Monster Details ~~~ ~~~ ~~~*/}

        {showMonsterStats &&  (
            <div className="statblock flex-wrap m-2 my-5 p-5 justify-around z-20 shadow-inner shadow-gray-800">

                {monsterImage && 
                <div className="flex justify-center h-60 mt-3 ">
                    <img className="rounded-3xl border-2 border-double border-gray-700 shadow-md shadow-gray-900" src={monsterImage} alt={monsterImage} />
                </div>
                }
                {/*TAB  Type/Alignment  */}
                <div className="flex justify-center my-3 capitalize">
                    <div>{monsterStats.size} </div>
                    <div className="ml-2">{monsterStats.type} </div>
                    {monsterStats.subtype && <div className="ml-1">({monsterStats.subtype}) </div>}
                    <div className="ml-2">{monsterStats.alignment} </div>
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
                    <div className="flex justify-center">
                    <div className="font-bold"> Speed: {monsterStats.speed.walk} </div>
                    {monsterStats.speed.fly && <div className="ml-1">(Fly: {monsterStats.speed.fly})</div>}
                    {monsterStats.speed.swim && <div className="ml-1">(Swim: {monsterStats.speed.swim})</div>}
                    {monsterStats.speed.climb && <div className="ml-1">(Climb: {monsterStats.speed.climb})</div>}
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
                
                {/* TAB Skills */}
                <div className="flex-col py-2 justify-evenly">
                    {<div className="flex justify-start font-bold">Saving Throws:
                    {profs.map((prof) => {
                        if(prof.save.includes("Saving")) {
                            return (<div className="mx-2 font-normal" key={prof.save}>{prof.save.slice(13)} +{prof.val}</div>)
                        } else {return}})}
                    </div> } 
                    <div className="flex justify-start font-bold">Skills:
                    {profs.map((prof) => {
                        if(prof.save.includes("Skill")){
                            return <div className="ml-2 font-normal" key={prof.save}>{prof.save.slice(6)} +{prof.val} </div>
                        } else {return}})}
                    </div>

                    {monsterStats.damage_immunities[0] && <div className="flex font-bold">Damage Immunities:  
                    <div className="flex font-normal ml-2">
                    {monsterStats.damage_immunities.map((type, index) => ( 
                        <div className="" key={type}>{(index ? ', ': '') + type}</div>))}
                    </div>
                    </div>}
                    
                    {monsterStats.condition_immunities[0] && <div className="flex font-bold">Condition Immunities:  
                    <div className="flex font-normal ml-2">
                    {monsterStats.condition_immunities.map((type, index) => ( 
                        <div className="lowercase" key={type.index}>{(index ? ', ': '') + type.name}</div>))}
                    </div>
                    </div>}

                    {monsterStats.damage_resistances[0] && <div className="flex font-bold">Damage Resistances:  
                    <div className="flex font-normal ml-2">
                    {monsterStats.damage_resistances.map((type, index) => ( 
                        <div className="" key={type}>{(index ? ', ': '') + type}</div>))}
                    </div>
                    </div>}

                    {monsterStats.damage_vulnerabilities[0] && <div className="flex font-bold">Damage vulnerabilities:  
                    <div className="flex font-normal ml-2">
                    {monsterStats.damage_vulnerabilities.map((type, index) => ( 
                        <div className="" key={type}>{(index ? ', ': '') + type}</div>))}
                    </div>
                    </div>}

                    {monsterStats.senses && <div className="flex font-bold">Senses:
                    <div className="flex font-normal ml-2">
                        {Object.keys(monsterStats.senses).map(sense => `${sense}: ${monsterStats.senses[sense]}`).join(", ").replaceAll('_', ' ') }
                    </div>
                    </div>}

                    {monsterStats.languages && <div className="flex font-bold">Languages: <div className="font-normal ml-2">{monsterStats.languages}</div></div>}

                    <div className="flex font-bold">Challenge: <div className="font-normal ml-2">{ ` ${monsterStats.challenge_rating} (${monsterStats.xp} XP)`}</div> </div>
                    
                </div>
                {specials[0] && <div className="cardLine"></div>}
                
                {specials[0] && <div className="flex-col font-bold">
                    {specials.map((special) => (
                        <div key={special.name} className="text-left my-4">{special.name}.<div key={special.desc} className="font-normal flex-wrap text-left">{special.desc} </div></div>
                    ))}
                    </div>}
                
                <div className="cardLine"></div>
                {/* TAB Actions */}
                <div className="flex text-lg">ACTIONS</div>
                {monsterStats.actions.map((action)=> (
                    <div key={action.name} className="flex font-bold my-4 flex-wrap">{action.name}. <div className="flex ml-2 font-normal text-left"> {action.desc}</div></div>
                ))}

                {monsterStats.legendary_actions[0] && <div className="cardLine"></div> }
                {monsterStats.legendary_actions[0] && <div className="flex text-lg">LEGENDARY ACTIONS</div>}
                {monsterStats.legendary_actions[0] && monsterStats.legendary_actions.map((action)=> (
                    <div key={action.name} className="flex font-bold my-4 flex-wrap">{action.name}. <div className="inline-flex ml-2 font-normal text-left flex-wrap"> {action.desc}</div></div>
                ))}

                {monsterStats.reactions && <div className="cardLine"></div> }
                {monsterStats.reactions && <div className="flex text-lg">REACTIONS</div>}
                {monsterStats.reactions && monsterStats.reactions.map((reaction)=> (
                    <div key={reaction.name} className="flex font-bold my-4">{reaction.name}. <div className="flex ml-2 font-normal text-left"> {reaction.desc}</div></div>
                ))}

                <div className="cardLine"></div>
                <div className="flex text-slate-400">{monsterStats.desc}</div>

            </div>)}
    </div>
)
    }