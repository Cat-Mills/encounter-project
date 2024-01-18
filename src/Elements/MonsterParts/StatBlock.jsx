import axios from "axios"
import { useState, useEffect } from "react"
import { More, Plus, X, Down, Up, PlaceholderImage, Bookmark, Hide } from "../../icons.jsx"

export default function StatBlock({ url, showBlock, name, types, monsterIn, indexOfFirstItem, indexOfLastItem, isRows, bookmarkedMonsters, setBookmarkedMonsters, inActiveEnc }) {

    const [monsterStats, setMonsterStats] = useState({})
    const [showMonsterStats, setShowMonsterStats] = useState(false)
    const [profs, setProfs] = useState({})
    const [specials, setSpecials] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [encounterKey, setEncounterKey] = useState(undefined)
    const [usersEncounters, setUsersEncounters] = useState([])
    const [monsterImage, setMonsterImage] = useState('')
    const [bookmarked, setBookmarked] = useState()

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

    // useEffect(() => {
    //     const data = window.localStorage.getItem('SAVED_MONSTER');
    //     if ( data !== null ) setBookmarkedMonsters(JSON.parse(data));
    // }, []);

    // useEffect(() => {
    //     if(bookmarked){
    //         // console.log('saved?', bookmarkedMonsters)
    //         setBookmarkedMonsters([...bookmarkedMonsters,bookmarked])
    //     }
    //     window.localStorage.setItem('SAVED_MONSTER', JSON.stringify(bookmarkedMonsters));
    // }, [bookmarked]);

    
    let paginationConfirm

    if (!types || types.length === 0) {
        if (monsterIn >= indexOfFirstItem && monsterIn <= indexOfLastItem) {
            paginationConfirm = true
        } else paginationConfirm = false
    } else {
        paginationConfirm = true
    }
    function toggleSaved(){
        if(!bookmarkedMonsters.includes(monsterStats.index)){
            setBookmarkedMonsters([...bookmarkedMonsters,monsterStats.index])
            setBookmarked(true)
        } else {
            setBookmarked(false)
            setBookmarkedMonsters(monsters => {
                return monsters.filter(mon => mon !== monsterStats.index)
            })
        }
        console.log(monsterStats.index)
        console.log(bookmarked)
        console.log(bookmarkedMonsters)
    }

    return (!types || types.includes(monsterStats.type) || types.length === 0 && paginationConfirm) && (
        <div >
            <div>
                {name && isRows &&
                    <div className="border flex justify-between m-2 p-2 px-4 bg-gray-600 relative">
                        <button onClick={()=>{toggleSaved()}}
                        className={` rotate-90 -translate-x-14 absolute overflow-x-hidden`}>
                            <Bookmark bookmarked={bookmarked} monsterPage={true}/>
                        </button>
                        {monsterImage ?
                            <div className="flex justify-center h-10 w-10">
                                <img className="rounded-3xl border border-gray-700" src={monsterImage} alt={monsterImage} />
                            </div> :
                            <div className="flex justify-center h-10 w-10">
                                <div className="group rounded-3xl border w-40 border-gray-700 bg-blackPaper bg-neutral-800 backdrop-contrast-150">
                                    <PlaceholderImage type={monsterStats.type} />
                                </div>
                            </div>
                        }
                        <h2 className="vinque font-bold capitalize text-lg text-shadow-sm shadow-black self-center ml-4 flex flex-grow-0 flex-shrink">{name} </h2>
                        {!showBlock && <div className="flex ml-8 mr-2 flex-shrink-0 flex-grow justify-end">
                            {(!showMonsterStats && !showModal) ?
                                <button className="hover:text-blue-400 flex self-center" onClick={() => { setShowMonsterStats(!showMonsterStats); getStats(); console.log(monsterStats); console.log() }}><Down /></button>
                                : !showModal &&
                                <button className="hover:text-blue-400 flex self-center" onClick={() => setShowMonsterStats(false)}><Up /></button>
                            }
                        </div>}
                        {showModal ? (
                            <div className="flex self-center md:ml-1 lg:ml-2">
                                <form className="flex" onSubmit={(e) => { console.log(url); handleAddToEncounter(e, "asdf"); }}>
                                    <select className=" bg-gray-700 focus: outline-none" value={encounterKey} onChange={e => { handleEncounterKey(e) }} placeholder="Encounter">
                                        {usersEncounters.map(encounter => (
                                            <option key={encounter.encounterId} value={encounter.encounterId}>{encounter.encounterName}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="mx-4 hover:text-blue-400">Add</button>
                                </form>
                                <button className="flex hover:text-blue-400" onClick={() => setShowModal(false)}><X /> </button>
                            </div>
                        ) :
                            <div className="flex self-center md:ml-1 lg:ml-2">
                                {!showBlock && <button onClick={() => setShowModal(true)} className="flex hover:text-blue-400"><Plus /></button>}
                            </div>
                        }
                    </div>}
                {name && !isRows &&
                    <div className="border flex flex-col p-2 bg-gray-600 justify-center">
                        <div className="h-60 flex flex-col justify-start items-center">
                            {monsterImage ?
                                <div className="flex justify-center h-10 w-10">
                                    <img className="rounded-3xl border border-gray-700" src={monsterImage} alt={monsterImage} />
                                </div> :
                                <div className="flex justify-center h-10 w-10">
                                    <div className="group rounded-3xl border w-40 border-gray-700 bg-blackPaper bg-neutral-800 backdrop-contrast-150">
                                        <PlaceholderImage type={monsterStats.type} />
                                    </div>
                                </div>
                            }

                            <h2 className="vinque font-bold capitalize text-lg flex text-shadow-sm shadow-black">{name}</h2>
                            <div className="flex flex-col justify-evenly my-3 capitalize font-exeter text-sm 2xl:text-base">
                                <div className="w-full flex justify-center ">
                                    <div className="">{monsterStats.size} </div>
                                    <div className="md:ml-1 lg:ml-2">{monsterStats.type} </div>
                                </div>
                                {monsterStats.subtype && <div className="flex justify-center text-sm">({monsterStats.subtype}) </div>}
                                <div className="w-full">{monsterStats.alignment} </div>
                                <div className="flex font-bold mt-3 justify-center">Challenge: <div className="font-normal md:ml-1 lg:ml-2 ">{` ${monsterStats.challenge_rating} (${monsterStats.xp} XP)`}</div> </div>
                            </div>
                        </div>
                        {!showBlock && <div className="flex ml-8 mr-2 justify-end">
                            {/* {(!showMonsterStats && !showModal) ?
                                <button className="hover:text-blue-400 flex self-center" onClick={() => { setShowMonsterStats(!showMonsterStats); getStats(); console.log(monsterStats); console.log() }}><Down /></button>
                                : !showModal &&
                                <button className="hover:text-blue-400 flex self-center" onClick={() => setShowMonsterStats(false)}><Up /></button>
                            } */}
                            {showModal ? (
                                <div className="flex self-end justify-evenly md:ml-1 lg:ml-2">
                                    <form className="flex" onSubmit={(e) => { console.log(url); handleAddToEncounter(e, "asdf"); }}>
                                        <select className=" bg-gray-700 focus: outline-none" value={encounterKey} onChange={e => { handleEncounterKey(e) }} placeholder="Encounter">
                                            {usersEncounters.map(encounter => (
                                                <option key={encounter.encounterId} value={encounter.encounterId}>{encounter.encounterName}</option>
                                            ))}
                                        </select>
                                        <button type="submit" className="ml-1 2xl:mx-4 hover:text-blue-400">Add</button>
                                    </form>
                                    <button className="flex hover:text-blue-400" onClick={() => setShowModal(false)}><X /> </button>
                                </div>
                            ) :
                                <div className="flex self-end md:ml-1 lg:ml-2">
                                    {!showBlock && <button onClick={() => setShowModal(true)} className="flex hover:text-blue-400"><Plus /></button>}
                                </div>
                            }
                        </div>}

                    </div>}
                <div>



                    {/*BOOK ~~~ ~~~ ~~~ Monster Stat Block ~~~ ~~~ ~~~*/}

                    {showMonsterStats && (
                        <div className="statblock flex-wrap p-3 lg:p-10 lg:px-20 justify-around z-20 shadow-inner shadow-gray-800 relative">
                            {inActiveEnc && <button className="absolute left-0 mx-4 hover:text-blue-400" title="Hide Statblock" onClick={() => setShowMonsterStats(false)}><Hide/></button>}
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
                                <div className="md:ml-1 lg:ml-2">{monsterStats.type} </div>
                                {monsterStats.subtype && <div className="ml-1">({monsterStats.subtype}) </div>}
                                <div className="md:ml-1 lg:ml-2">{monsterStats.alignment} </div>
                            </div>



                            <div className="cardLine"></div>

                            {/*TAB  Armor */}
                            <div>
                                <div className="flex justify-center font-bold text-xl">Armor Class: {(monsterStats.armor_class[0].value)}
                                    {monsterStats.armor_class[0].type &&
                                        <div className="capitalize italic md:ml-1 lg:ml-2">({monsterStats.armor_class[0].type})</div>}
                                </div>

                                {/*TAB Hit Points */}
                                <div className="font-bold flex justify-center text-xl">HP: {monsterStats.hit_points}
                                    <div className="font-normal italic md:ml-1 lg:ml-2">({monsterStats.hit_points_roll})</div>
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
                            {/* TODO display ability modifiers under the scores */}
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
                                            return <div className="md:ml-1 lg:ml-2 font-normal desc" key={prof.save}>{prof.save.slice(6)} +{prof.val} </div>
                                        } else { return }
                                    })}
                                </div>
                                {/* TAB Conditions */}
                                {monsterStats.damage_immunities[0] && <div className="flex font-bold title">Damage Immunities:
                                    <div className="flex font-normal md:ml-1 lg:ml-2 desc">
                                        {monsterStats.damage_immunities.map((type, index) => (
                                            <div className="" key={type}>{(index ? ', ' : '') + type}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.condition_immunities[0] && <div className="flex font-bold title">Condition Immunities:
                                    <div className="flex font-normal md:ml-1 lg:ml-2 desc h-fit flex-wrap">
                                        {monsterStats.condition_immunities.map((type, index) => (
                                            <div className="lowercase" key={type.index}>{(index ? ', ' : '') + type.name}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.damage_resistances[0] && <div className="flex font-bold title">Damage Resistances:
                                    <div className="flex font-normal md:ml-1 lg:ml-2 desc">
                                        {monsterStats.damage_resistances.map((type, index) => (
                                            <div className="" key={type}>{(index ? ', ' : '') + type}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.damage_vulnerabilities[0] && <div className="flex font-bold title">Damage vulnerabilities:
                                    <div className="flex font-normal md:ml-1 lg:ml-2 desc">
                                        {monsterStats.damage_vulnerabilities.map((type, index) => (
                                            <div className="" key={type}>{(index ? ', ' : '') + type}</div>))}
                                    </div>
                                </div>}

                                {monsterStats.senses && <div className="flex font-bold title">Senses:
                                    <div className="flex font-normal md:ml-1 lg:ml-2 desc">
                                        {Object.keys(monsterStats.senses).map(sense => `${sense}: ${monsterStats.senses[sense]}`).join(", ").replaceAll('_', ' ')}
                                    </div>
                                </div>}

                                {monsterStats.languages && <div className="flex font-bold title">Languages: <div className="font-normal md:ml-1 lg:ml-2 desc">{monsterStats.languages}</div></div>}

                                <div className="flex font-bold title pb-5">Challenge: <div className="font-normal md:ml-1 lg:ml-2 desc">{` ${monsterStats.challenge_rating} (${monsterStats.xp} XP)`}</div> </div>

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
                                <div key={action.name} className="flex font-bold my-4 flex-wrap text-xl pt-5">{action.name}. <div className="flex md:ml-1 lg:ml-2 font-normal text-left text-lg pl-5 exeter w-full"> {action.desc}</div></div>
                            ))}

                            {monsterStats.legendary_actions[0] && <div className="cardLine"></div>}
                            {monsterStats.legendary_actions[0] && <div className="flex text-xl">LEGENDARY ACTIONS</div>}
                            {monsterStats.legendary_actions[0] && monsterStats.legendary_actions.map((action) => (
                                <div key={action.name} className="flex font-bold my-4 flex-wrap text-xl pt-5">{action.name}. <div className="flex md:ml-1 lg:ml-2 font-normal text-left text-lg pl-5 exeter w-full"> {action.desc}</div></div>
                            ))}

                            {monsterStats.reactions && <div className="cardLine"></div>}
                            {monsterStats.reactions && <div className="flex text-xl">REACTIONS</div>}
                            {monsterStats.reactions && monsterStats.reactions.map((reaction) => (
                                <div key={reaction.name} className="flex font-bold my-4 flex-wrap text-xl pt-5">{reaction.name}. <div className="flex md:ml-1 lg:ml-2 font-normal text-left text-lg pl-5 exeter w-full"> {reaction.desc}</div></div>
                            ))}

                            <div className="cardLine"></div>
                            <div className="flex text-slate-400">{monsterStats.desc}</div>

                        </div>)}
                </div>
            </div>
        </div>
    )
}