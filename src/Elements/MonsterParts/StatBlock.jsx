import axios from "axios"
import { useState, useEffect } from "react"
import { More, Plus, X, Down, Up, PlaceholderImage } from "../../icons.jsx"

export default function StatBlock({ url, showBlock, name, types, monsterIn, indexOfFirstItem, indexOfLastItem,isRows }) {
    const [monsterStats, setMonsterStats] = useState({})
    const [showMonsterStats, setShowMonsterStats] = useState(false)
    const [profs, setProfs] = useState({})
    const [specials, setSpecials] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [encounterKey, setEncounterKey] = useState(undefined)
    const [usersEncounters, setUsersEncounters] = useState([])
    const [monsterImage, setMonsterImage] = useState('')

    async function getStats() {
        let img = ''
        // console.log(url)
        axios
            .get(`https://www.dnd5eapi.co${url}`)
            .then(res => {
                setMonsterStats(res.data)
                setProfs(res.data.proficiencies.map(prof => (
                    { save: prof.proficiency.name, val: prof.value }
                )))
                setSpecials(res.data.special_abilities.map(special => (
                    { name: special.name, desc: special.desc }
                )))
                img = res.data.image ? res.data.image : null

                if (showBlock) {
                    setShowMonsterStats(true)
                }
                if (img) { setMonsterImage(`https://www.dnd5eapi.co${img}`) }
                else {
                    setMonsterImage(null)

                }
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
        axios.post(`/api/monsters/${encounterKey}`, { monsterUrl: url, encounterId: encounterKey })
            .then(res => {
                console.log(res.data)

                setShowModal(false)
                // getEncounterTables()
            }).catch(err => console.log(err))
    }
    useEffect(() => { getStats(), getEncounterTables() }, [])
    // console.log(monsterStats.type)
//                                                  
    let paginationConfirm 

    if(types.length === 0){
        if(monsterIn >= indexOfFirstItem &&  monsterIn <= indexOfLastItem) {
            paginationConfirm = true
        } else paginationConfirm = false
    } else {
        paginationConfirm = true
    }  
    
    return (!types || types.includes(monsterStats.type) || types.length === 0 && paginationConfirm) && (
        <div >
            <div className="m-2">
                {name && !isRows && 
                <div className="border flex m-2 p-2 bg-gray-600 ">
                    <h2 className="vinque font-bold capitalize text-lg">{name} </h2>
                </div>}
                {name && isRows && 
                <div className="border flex p-2 bg-gray-600">
                    <div className="h-60 flex flex-col justify-center items-center">
                        <h2 className="vinque font-bold capitalize text-lg">{name}</h2>
                    {monsterImage ?
                                <div className="flex justify-center h-10 w-10">
                                    <img className="rounded-3xl border-2 border-double border-gray-700" src={monsterImage} alt={monsterImage} />
                                </div> :
                                <div className="flex justify-center h-10 w-10">
                                    <div className="group rounded-3xl border-2 border-double w-40 border-gray-700 bg-blackPaper bg-neutral-800 backdrop-contrast-150">
                                        <PlaceholderImage type={monsterStats.type} />
                                    </div>
                                </div>
                            }
                    </div>
                        
                </div>}
                {/* {console.log(paginationConfirm)} */}
                <div>
                    {!showBlock && !isRows && <div className="flex relative w-11/12 ml-8">
                        {!showMonsterStats ?
                            <button className="hover:text-blue-400 flex absolute justify-center  bottom-4 left-full" onClick={() => { setShowMonsterStats(!showMonsterStats); getStats(); console.log(monsterStats); console.log() }}><Down /></button>
                            :
                            <div>
                                <button className="hover:text-blue-400 flex absolute justify-center bottom-4 left-full" onClick={() => setShowMonsterStats(false)}><Up /></button>
                            </div>
                        }
                    </div>}

                    {showModal ? (
                        !isRows && <div className="flex relative w-11/12 -ml-3 ">
                            <button className=" flex absolute justify-center left-full bottom-4 hover:text-blue-400" onClick={() => setShowModal(false)}><X /> </button>

                            <form className="ml-16 flex absolute justify-center bottom-4 left-2/3" onSubmit={(e) => { console.log(url); handleAddToEncounter(e, "asdf"); }}>
                                <button type="submit" className="mr-2 hover:text-blue-400">Add to</button>

                                <select className=" bg-gray-700 focus: outline-none" value={encounterKey} onChange={e => { handleEncounterKey(e) }} placeholder="Encounter">

                                    {usersEncounters.map(encounter => (
                                        <option key={encounter.encounterId} value={encounter.encounterId}>{encounter.encounterName}</option>
                                    ))}

                                </select>
                            </form>
                        </div>
                    ) :
                        <div className="flex relative w-11/12 -ml-3">
                            {!showBlock && !isRows && <button onClick={() => setShowModal(true)} className="flex absolute justify-center left-full bottom-4 hover:text-blue-400"><Plus /></button>}
                        </div>
                    }

                    {/*BOOK ~~~ ~~~ ~~~ Monster Details ~~~ ~~~ ~~~*/}

                    {showMonsterStats && (
                        <div className="statblock flex-wrap m-2 my-5 p-10 md:p-20 justify-around z-20 shadow-inner shadow-gray-800">

                            {monsterImage ?
                                <div className="flex justify-center h-40 md:h-60 mt-3 ">
                                    <img className="rounded-3xl border-2 border-double border-gray-700 shadow-md shadow-gray-900" src={monsterImage} alt={monsterImage} />
                                </div> :
                                <div className="flex justify-center h-40 mt-3 ">
                                    <div className="group rounded-3xl border-2 border-double w-40 border-gray-700 shadow-md shadow-gray-900 bg-blackPaper bg-neutral-800 backdrop-contrast-150">
                                        <PlaceholderImage type={monsterStats.type} />
                                    </div>
                                </div>
                            }
                            <div className=" text-3xl z-30 flex justify-center mt-3 -mb-2 font-semibold vinque text-shadow-lg shadow-black">
                                {monsterStats.name}
                            </div>
                            {/*TAB  Type/Alignment  */}
                            <div className="flex justify-center my-3 capitalize text-xl gap-3 ">
                                <div>{monsterStats.size} </div>
                                <div className="ml-2">{monsterStats.type} </div>
                                {monsterStats.subtype && <div className="ml-1">({monsterStats.subtype}) </div>}
                                <div className="ml-2">{monsterStats.alignment} </div>
                            </div>



                            <div className="cardLine"></div>

                            {/*TAB  Armor */}
                            <div>
                                <div className="flex justify-center font-bold text-xl">Armor Class: {(monsterStats.armor_class[0].value)}
                                    {monsterStats.armor_class[0].type &&
                                        <div className="capitalize italic ml-2">({monsterStats.armor_class[0].type})</div>}
                                </div>

                                {/*TAB Hit Points */}
                                <div className="font-bold flex justify-center text-xl">HP: {monsterStats.hit_points}
                                    <div className="font-normal italic ml-2">({monsterStats.hit_points_roll})</div>
                                </div>

                                {/*TAB Speed */}
                                <div className="flex justify-center text-xl">
                                    <div className="font-bold mr-2"> Speed: {monsterStats.speed.walk} </div>
                                    {monsterStats.speed.fly && <div className="ml-1">(Fly: {monsterStats.speed.fly})</div>}
                                    {monsterStats.speed.swim && <div className="ml-1">(Swim: {monsterStats.speed.swim})</div>}
                                    {monsterStats.speed.climb && <div className="ml-1">(Climb: {monsterStats.speed.climb})</div>}
                                </div>
                            </div>
                            <div className="cardLine"></div>
                            {/*TAB Ability Scores */}
                            <div className="flex justify-around my-2 text-xl text-center tracking-widest">
                                <div className="font-bold">STR<div className="font-normal text-2xl">{monsterStats.strength}</div></div>
                                <div className="font-bold">DEX<div className="font-normal text-2xl">{monsterStats.dexterity}</div></div>
                                <div className="font-bold">CON<div className="font-normal text-2xl">{monsterStats.constitution}</div></div>
                                <div className="font-bold">INT<div className="font-normal text-2xl">{monsterStats.intelligence}</div></div>
                                <div className="font-bold">WIS<div className="font-normal text-2xl">{monsterStats.wisdom}</div></div>
                                <div className="font-bold">CHA<div className="font-normal text-2xl">{monsterStats.charisma}</div></div>
                            </div>
                            <div className="cardLine"></div>

                            {/* TAB Skills */}
                            <div className="flex-col justify-evenly">
                                {<div className="flex justify-start font-bold title">Saving Throws:
                                    {profs.map((prof) => {
                                        if (prof.save.includes("Saving")) {
                                            return (<div className="mx-2 font-normal desc" key={prof.save}>{prof.save.slice(13)} +{prof.val}</div>)
                                        } else { return }
                                    })}
                                </div>}
                                <div className="flex justify-start font-bold title">Skills:
                                    {profs.map((prof) => {
                                        if (prof.save.includes("Skill")) {
                                            return <div className="ml-2 font-normal desc" key={prof.save}>{prof.save.slice(6)} +{prof.val} </div>
                                        } else { return }
                                    })}
                                </div>
                                {/* TAB Conditions */}
                                {monsterStats.damage_immunities[0] && <div className="flex font-bold title">Damage Immunities:
                                    <div className="flex font-normal ml-2 desc">
                                        {monsterStats.damage_immunities.map((type, index) => (
                                            <div className="" key={type}>{(index ? ', ' : '') + type}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.condition_immunities[0] && <div className="flex font-bold title">Condition Immunities:
                                    <div className="flex font-normal ml-2 desc">
                                        {monsterStats.condition_immunities.map((type, index) => (
                                            <div className="lowercase" key={type.index}>{(index ? ', ' : '') + type.name}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.damage_resistances[0] && <div className="flex font-bold title">Damage Resistances:
                                    <div className="flex font-normal ml-2 desc">
                                        {monsterStats.damage_resistances.map((type, index) => (
                                            <div className="" key={type}>{(index ? ', ' : '') + type}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.damage_vulnerabilities[0] && <div className="flex font-bold title">Damage vulnerabilities:
                                    <div className="flex font-normal ml-2 desc">
                                        {monsterStats.damage_vulnerabilities.map((type, index) => (
                                            <div className="" key={type}>{(index ? ', ' : '') + type}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.senses && <div className="flex font-bold title">Senses:
                                    <div className="flex font-normal ml-2 desc">
                                        {Object.keys(monsterStats.senses).map(sense => `${sense}: ${monsterStats.senses[sense]}`).join(", ").replaceAll('_', ' ')}
                                    </div>
                                </div>}

                                {monsterStats.languages && <div className="flex font-bold title">Languages: <div className="font-normal ml-2 desc">{monsterStats.languages}</div></div>}

                                <div className="flex font-bold title pb-5">Challenge: <div className="font-normal ml-2 desc">{` ${monsterStats.challenge_rating} (${monsterStats.xp} XP)`}</div> </div>

                            </div>
                            {specials[0] && <div className="cardLine"></div>}

                            {specials[0] && <div className="flex-col font-bold last: ">
                                {specials.map((special) => (
                                    <div key={special.name} className="text-left my-4 title">{special.name}.<div key={special.desc} className="font-normal flex-wrap text-left desc w-full">{special.desc} </div></div>
                                ))}
                            </div>}

                            <div className="cardLine"></div>
                            {/* TAB Actions */}
                            <div className="flex text-xl">ACTIONS</div>
                            {monsterStats.actions.map((action) => (
                                <div key={action.name} className="flex font-bold my-4 flex-wrap text-xl pt-5">{action.name}. <div className="flex ml-2 font-normal text-left text-lg pl-5 exeter w-full"> {action.desc}</div></div>
                            ))}

                            {monsterStats.legendary_actions[0] && <div className="cardLine"></div>}
                            {monsterStats.legendary_actions[0] && <div className="flex text-xl">LEGENDARY ACTIONS</div>}
                            {monsterStats.legendary_actions[0] && monsterStats.legendary_actions.map((action) => (
                                <div key={action.name} className="flex font-bold my-4 flex-wrap text-xl pt-5">{action.name}. <div className="flex ml-2 font-normal text-left text-lg pl-5 exeter w-full"> {action.desc}</div></div>
                            ))}

                            {monsterStats.reactions && <div className="cardLine"></div>}
                            {monsterStats.reactions && <div className="flex text-xl">REACTIONS</div>}
                            {monsterStats.reactions && monsterStats.reactions.map((reaction) => (
                                <div key={reaction.name} className="flex font-bold my-4 flex-wrap text-xl pt-5">{reaction.name}. <div className="flex ml-2 font-normal text-left text-lg pl-5 exeter w-full"> {reaction.desc}</div></div>
                            ))}

                            <div className="cardLine"></div>
                            <div className="flex text-slate-400">{monsterStats.desc}</div>

                        </div>)}
                </div>
            </div>
        </div>
    )
}