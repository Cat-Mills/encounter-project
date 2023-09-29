import axios from "axios";
import { useState, useEffect } from "react";
import StatBlock from "../MonsterParts/StatBlock";

export default function ActiveCard({ entities }) {
    // console.log(entities)
    entities.map((entity, i) => {
        entity.id = entity[i] + i.toString()
    })
    // function initiativeRoll(dexMod){
    //     let initiative = d20.roll() + dexMod
    //     // console.log(initiative)
    //     return initiative
    // }

    return (
        <div className="flex">

            

            <div>
                {entities.map((entity, i) => (
                    
                    <div className="m-2" key={entity.playerId ? entity.playerId : entity.id}>
                        
                    {entity.playerId &&
                        
                        <div className="flex justify-start">
                            <div className="mr-2"> {entity.initiative} </div>
                            <div className="mr-2 text-start">{entity.playerName}</div>
                        </div>}
                    
                    {entity.index && 
                        <div className="flex justify-start ">
                            <div className="mr-2"> {entity.initiative} </div>
                            <div className="mr-2 text-start">{entity.name}</div>
                        </div>}

                    </div>
                ))}
                {/* <div className="p-2 font-bold"> {player.playerName} </div>
                <div className="p-2"> Lv: {player.playerLv} </div>
                <div className="p-2"> HP: {player.playerHP} </div>
                <div className="p-2"> AC: {player.playerAC} </div>
                <div className="p-2"> +{player.playerInit} to initiative </div>
                <div>
                    <button onClick={() => initiativeRoll(player.playerInit)}>Roll Initiative</button>
                </div> */}
            </div>

        </div>
    )
}