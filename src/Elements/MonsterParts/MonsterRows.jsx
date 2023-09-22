import React from "react"
import { useState } from "react"
import StatBlock from "./StatBlock"


export default function MonsterRows({monsterList}) {

    const [showMonsterStats, setShowMonsterStats] = useState(false)

    const handleClick = () =>{
        if(showMonsterStats){
            return
        }
        return(setShowMonsterStats(true))
    }

    return(
<div>
    {/* <div>{filteredMonsterList} </div> */}
    {monsterList.map((monster) => (
        <div key={monster.url}>
            <div className="border-solid border border-spacing-1 flex justify-around m-2 p-2">
                <h2 className="font-bold capitalize text-lg">{monster.name} </h2>
                {!showMonsterStats ?
                    <button onClick={() => handleClick()}>details</button>
                    :
                    <div key={monster.url}>
                        <StatBlock
                            url={monster.url} />
                        <button onClick={() => setShowMonsterStats(false)}>close</button>
                    </div>}
            </div>
        </div>
    ))}
</div>
    )
}

