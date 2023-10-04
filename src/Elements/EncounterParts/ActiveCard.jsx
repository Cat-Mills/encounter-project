import axios from "axios";
import { useState, useEffect } from "react";
import StatBlock from "../MonsterParts/StatBlock";
import HitPointTracker from "./HitPointTracker.jsx";
import { Shield } from "../../icons";

export default function ActiveCard({ entities }) {
    // console.log(entities)
    const [showCard, setShowCard] = useState('')
    entities.map((entity, i) => {
        entity.id = entity[i] + i.toString()
    })
    // function initiativeRoll(dexMod){
    //     let initiative = d20.roll() + dexMod
    //     // console.log(initiative)
    //     return initiative
    // }

    return (
        <div className=" flex w-full gap-3 relative exeter">

            <div className=" border border-solid w-1/2 flex-col space-y-7 py-3 bg-gray-600">
                <div className="flex w-full justify-center">
                    <div className="w-1/4">Initiative</div>
                    <div className="w-1/4">Name</div>
                    <div className="w-1/4">AC</div>
                    <div className="w-1/4">HP:</div>
                </div>
                {entities.map((entity, i) => (
                    
                    <div className="flex" key={entity.playerId ? entity.playerId : entity.id}>
                        
                    {entity.playerId &&
                        
                        <div className="flex w-full items-center">
                            <div className="w-1/4"> {entity.initiative} </div>
                            <div className="w-1/4">{entity.playerName}</div>
                            <div className="w-1/4 relative"> <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Shield/> </div><div className=" relative "> {entity.playerAC} </div></div>
                            <div className="w-1/4"><HitPointTracker totalHP={entity.playerHP}/> </div>
                        </div>}
                    
                    {entity.index && 
                        <div className="flex w-full items-center">
                            <div className="w-1/4"> {entity.initiative} </div>
                            <button onClick={() => {showCard===''? setShowCard(entity.id) : setShowCard(''); }} className="w-1/4 hover:text-blue-400">{entity.name}</button>
                            <div className="w-1/4 relative"><div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Shield/> </div><div className="relative"> {entity.armor_class[0].value}</div>  </div>
                            <div className="w-1/4"><HitPointTracker totalHP={entity.hit_points}/> </div>
                        </div>}
                        {showCard === entity.id &&
                        
                        <div className="bg-gray-600 z-10 absolute w-1/2 max-h-full left-1/2 top-0 border border-solid overflow-scroll ml-1">
                            <StatBlock url={entity.url} showBlock={true} />
                        </div>
                        }
                    </div>
                ))}
                
            </div>
            <div className="border border-solid w-1/2 flex-col space-y-7 py-3 bg-gray-600">
                Select a monster to see more details
            </div>

        </div>
    )
}