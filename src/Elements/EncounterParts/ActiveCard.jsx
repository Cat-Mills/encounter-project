import axios from "axios";
import { useState, useEffect } from "react";
import StatBlock from "../MonsterParts/StatBlock";
import HitPointTracker from "./HitPointTracker.jsx";
import { Shield } from "../../icons";

export default function ActiveCard({ entities, activeEnt }) {
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
        <div className="flex flex-col sm:flex-row w-full gap-3 relative exeter min-h-[60vh]">

            <div className="text-sm sm:text-base lg:text-lg border-2 w-full sm:w-1/2 flex flex-col space-y-4 sm:space-y-7 py-3 bg-gray-600 justify-around">
                <div className="flex w-full justify-center border-b-[1px] border-dashed [&>*]:w-1/4 pb-2">
                    <div >Initiative</div>
                    <div>Name</div>
                    <div>AC</div>
                    <div>HP</div>
                </div>
                {entities.map((entity, i) => (
                    
                    <div className="flex" key={entity.playerId ? entity.playerId : entity.id}>
                        
                    {entity.playerId &&
                        
                        <div className="flex w-full">
                            {entity == activeEnt && <div className="arrow-right absolute"></div>}
                            <div className="w-1/4 self-center"> {entity.initiative} </div>
                            <div className="w-1/4 self-center">{entity.playerName}</div>
                            <div className="w-1/4 relative self-center"> <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Shield/> </div><div className=" relative self-center "> {entity.playerAC} </div></div>
                            <div className="w-1/4"><HitPointTracker totalHP={entity.playerHP}/> </div>
                        </div>}
                    
                    {entity.index && 
                        <div className="flex w-full items-center">
                            {entity == activeEnt && <div className="arrow-right absolute"></div>}
                            <div className="w-1/4 self-center"> {entity.initiative} </div>
                            <button onClick={() => {setShowCard(entity.id)}} className="w-1/4 self-center hover:text-red-600 text-red-400">{entity.name}</button>
                            <div className="w-1/4 self-center relative"><div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Shield/> </div><div className="relative"> {entity.armor_class[0].value}</div>  </div>
                            <div className="w-1/4"><HitPointTracker totalHP={entity.hit_points}/> </div>
                        </div>}
                        {showCard === entity.id &&
                        
                        <div className="bg-gray-600 z-10 max-h-[70vh] sm:max-h-full w-full absolute bottom-0 sm:w-1/2 sm:left-1/2 sm:top-0 border-2 overflow-scroll overflow-x-hidden sm:ml-1">
                            <StatBlock url={entity.url} showBlock={true} inActiveEnc={true}/>
                        </div>
                        }
                    </div>
                ))}
                
            </div>
            {showCard === '' && <div className="border-2 w-full text-base sm:text-lg sm:w-1/2 flex-col space-y-7 py-3 bg-gray-600">
                Select a monster to see more details
            </div>}

        </div>
    )
}