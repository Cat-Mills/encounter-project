import axios from "axios";
import { useState, useEffect } from "react";
import { Trash, More, ChevronRight, Down, Up } from "../../icons.jsx";
import StatBlock from "../MonsterParts/StatBlock.jsx";

export default function MonsterCards({ monsterUrl,monsterId, getMonsters, activeEncounter}) {
    const [monsterStats, setMonsterStats] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showStatBlock, setShowStatBlock] = useState(false)
    const [monsterDexMod, setMonsterDexMod] = useState(0)
    const [monsterAC, setMonsterAC] = useState(0)
    

    async function getStats() {
        let ac = 0
        let dexMod = 0
        await axios
            .get(`https://www.dnd5eapi.co${monsterUrl}`)
            .then(res => {
                setMonsterStats(res.data)
                ac = res.data.armor_class[0].value
                dexMod = Math.floor((res.data.dexterity - 10) / 2)
                // console.log(res.data.dexterity)
                // updateTotalXP(res.data.xp)
            })
            .catch(err => console.log(err))

            setMonsterAC(ac)
            setMonsterDexMod(dexMod)
        }
        

    const deleteMonster = () => {
        axios.delete(`/api/monsters/${monsterId}`)
        .then(res => {
            console.log(res)
            alert("monster removed")
            getMonsters()
        })
        .catch(err => console.log(err))
    }

    useEffect(() => { getStats() }, [])
    // console.log(showStatBlock)
    return(
        <div className="flex justify-center ">
            
            {!activeEncounter && 
            <button 
            onClick={() => {setShowModal(current => !current) }} 
            className="mr-3 my-1 hover:ring-gray-500 hover:text-blue-400 hover:ring-2 focus:ring-2 focus:ring-gray-300 focus: outline-none font-medium px-3 py-1 text-center inline-flex items-center justify-between " type="button">{monsterStats.name}<ChevronRight /></button>
            }
            
            {showModal && !activeEncounter && 
            <div className="flex ">
                <button className="mr-2 hover:text-blue-400" onClick={() => {setShowStatBlock(current => !current) }}>{showStatBlock ? <Up/> :<Down/>}</button>

                <button className="ml-2 hover:text-blue-400" onClick={() => deleteMonster()}><Trash/> </button>
            </div>
            }
            {activeEncounter &&
            <div className="flex-col m-1">
                <div className="flex align-middle justify-center">
                    <div className="mx-1 font-bold text-lg self-center">{monsterStats.name}</div>
                    <div className="mx-2 self-center">HP: {monsterStats.hit_points} </div>
                    <div className="mx-2 self-center">AC: {monsterAC} </div>
                    <div className="mx-2 self-center">+ {monsterDexMod} to initiative</div>
                </div>
                {/* <button onClick={()=> {console.log("Stats:",monsterStats)}}>stats</button> */}
                
            </div>
            }
            {showModal && activeEncounter &&
            <div className="flex justify-start">
                <button className="mr-2 hover:text-blue-400" onClick={() => {setShowStatBlock(current => !current) }} >{showStatBlock ? <Up/> : <Down/> }</button>
            </div>
            }
            {showStatBlock &&
            <div className=" bg-gray-600 z-10">
                <StatBlock url={monsterUrl} showBlock={true} />
            </div>
            }
        </div>
    )
}



