import { useState } from "react";
import React from "react";

export default function HitPointTracker({ totalHP }) {
    const [currentHP, setCurrentHP] = useState(totalHP)
    const [editHP, setEditHP] = useState(false)
    const [hpMod, setHpMod] = useState(0)
    const [maxHP, setMaxHP] = useState(false)
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
            <button onClick={() => { setEditHP(!editHP) }} className="w-2/3 bg-gray-600 px-1 shadow-sm shadow-black ">{currentHP} / {totalHP} </button>
            {editHP &&
                <div className="absolute border border-solid bg-gray-700 p-1 z-50 right-full sm:left-full top-0 -ml-2 rounded-md flex-col w-40">
                    <input className={`${hpMod >= 0 ? 'text-green-500' : 'text-red-500'} bg-gray-600 w-min text-base focus:outline-none pl-1 py-0.5 my-1`} type="number" min={-1000} max={totalHP}  placeholder={0} onChange={(e) => setHpMod(+(e.target.value))} /><br />
                    <input id="input" type="checkbox" checked={maxHP} className="inline" onChange={() => setMaxHP(!maxHP)} />
                    <label htmlFor="input" className="inline text-base">Override Max HP</label><br />
                    <button className="hover:text-blue-400 mt-2" onClick={() => { updateHP(); setEditHP(false) }}>Apply Change</button>
                </div>
            }
        </div>)
}