import { useState } from "react";
import React from "react";

export default function HitPointTracker({ totalHP }) {
    const [currentHP, setCurrentHP] = useState(totalHP)
    const [editHP, setEditHP] = useState(false)
    const [hpMod, setHpMod] = useState(0)
    const [maxHP, setMaxHP] = useState(false)
    //TODO make options for the following: Heal, Damage, Temp HP, and Override Max HP
    // console.log(maxHP)

    function updateHP() {
        console.log(currentHP)
        if (maxHP) {
            setCurrentHP(currentHP + hpMod)
        }
        else {
            if (currentHP + hpMod > totalHP) { setCurrentHP(totalHP) }
            else { setCurrentHP(hpMod + currentHP) }
        }
        setHpMod(0)
    }
    return (
        <div className="flex-col relative">
            <button onClick={() => { setEditHP(!editHP) }} className="mx-2 bg-gray-600 px-1 ">{currentHP}/{totalHP} </button>
            {editHP &&
                <div className="absolute border border-solid bg-gray-700 p-1 z-50 left-full top-0 -ml-2 rounded-md flex-col w-40">
                    <input className={`${hpMod >= 0 ? 'text-green-500' : 'text-red-500'} bg-gray-600 w-min focus:outline-none pl-1 py-1 my-1`} type="number" min={-1000} max={totalHP}  placeholder={0} onChange={(e) => setHpMod(+(e.target.value))} /><br />
                    <input id="input" type="checkbox" checked={maxHP} className="inline" onChange={() => setMaxHP(!maxHP)} />
                    <label htmlFor="input" className="inline text-sm">Override Max HP</label><br />
                    <button className="hover:text-blue-400 mt-2" onClick={() => { updateHP(); setEditHP(false) }}>apply</button>
                </div>
            }
        </div>)
}