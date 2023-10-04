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
            getMonsters()
        })
        .catch(err => console.log(err))
    }

    useEffect(() => { getStats() }, [])
    // console.log(showStatBlock)
    return(
        <><div className="flex justify-center w-full ">

            {!activeEncounter &&
                <button
                    onClick={() => { setShowModal(current => !current); } }
                    className={`${showStatBlock===true ? ' hidden' : 'font-medium no-underline' } mr-3 my-4 hover:ring-gray-500 hover:text-blue-400 hover:ring-2 focus:ring-2 focus:ring-gray-300 focus: outline-none font-medium px-3 py-1  text-center flex items-center justify-between vinque text-lg`}
                    type="button">{monsterStats.name}</button>}

            {showModal &&
                <div className="flex ">
                    <button className="mr-2 hover:text-blue-400" onClick={() => { setShowStatBlock(current => !current); } }>{showStatBlock ? <p>Hide</p> : <p>Details</p>}</button>

                    {!showStatBlock && <button className=" ml-2 hover:text-blue-400" onClick={() => deleteMonster()}><Trash /> </button>}
                </div>}

            
                </div>
                <div>
                {showStatBlock &&
                    <div className="">
                    
                    <div className=" max-h-[50vh] max-w-[50vw] overflow-scroll bg-gray-600 z-10 font-exeter text-lg">
                        <StatBlock url={monsterUrl} showBlock={true} />
                    </div>
                    </div>
                    }
            </div>
        </>
    )
}



