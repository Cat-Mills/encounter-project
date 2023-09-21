import React from "react"


export default function MonsterRows({monsterList, setMonsterList}) {
    return(
<div>
    {monsterList.map((monster) => (
    <div key={monster.index} className="border-solid border border-spacing-1 flex justify-start m-2">
        <h2 className="font-bold capitalize text-lg">
        {monster.name} 
        </h2>
    </div>
    ))}
</div>
    )
}

