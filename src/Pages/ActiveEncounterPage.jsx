import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MonsterCards from "../Elements/EncounterParts/monsterCards.jsx";
import Calculators from "../Elements/EncounterParts/Calculators.jsx";


function ActiveEncounters() {
    const { id } = useParams();
    const [activeEncounter, setActiveEncounter] = useState({});
    const [campaignName, setCampaignName] = useState('');
    const [monsters, setMonsters] = useState([]);
    const [totalXP, setTotalXP] = useState(0)



    const getActiveEncounter = async () => {
        await axios.get(`/api/active/${id}`)
            .then(res => {
                setActiveEncounter(res.data);
                setCampaignName(res.data.enccamps[0].campaign.campaignName);
                setMonsters(res.data.monsters);
            })
            .catch(err => console.log(err));
    };

    const updateTotalXP = (num) => {
        setTotalXP(prevState => prevState + num)
    }


    useEffect(() => { getActiveEncounter(); }, []);
    // console.log("activeEncounter",activeEncounter)
    console.log(totalXP)
    return (activeEncounter &&
        <div className="border p-5 bg-gray-700 ">
            <div> </div>
            <div>
                Pulling players from {campaignName}...
            </div>
            <div>
                Pulling monsters from {activeEncounter.encounterName}...
            </div>
            <div>
                {monsters &&
                    monsters.map((monster) => (
                        <div key={monster.monsterId}>
                            <MonsterCards
                                monsterUrl={monster.monsterUrl}
                                monsterId={monster.monsterId}
                                activeEncounter={true}
                                updateTotalXP={updateTotalXP}
                            />
                        </div>
                    ))}
                    
            </div>
            <div>
                <Calculators monsters={monsters}/>
            </div>
            <div className="flex justify-center">
                <NavLink className="hover:text-blue-400 mt-4" to="/encounters">End Encounter</NavLink>
            </div>
        </div>
    );
}
export default ActiveEncounters