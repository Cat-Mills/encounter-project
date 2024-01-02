import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ActiveCard from "../Elements/EncounterParts/ActiveCard.jsx";
import { ChevronLeft, ChevronRight } from "../icons.jsx";
// import DiceWidget from "../Elements/DiceWidget.jsx";



function ActiveEncounters() {
    const { id } = useParams();
    const [activeEncounter, setActiveEncounter] = useState({});
    const [campaignName, setCampaignName] = useState('');
    const [numOfMonsters, setNumOfMonsters] = useState(0)
    const [initialXp, setTotalXP] = useState(0)
    const [entities, setEntities] = useState([])
    const [challengeRating, setChallengeRating] = useState(0)
    const [players, setPlayers] = useState([])
    const [calculatedXp, setCalculatedXp] = useState(0)
    const [xpBudget, setXpBudget] = useState(0)
    const [difficulty, setDifficulty] = useState('')
    const [showStart, setShowStart] = useState(false)
    const [activeEnt, setActiveEnt] = useState()
    const [turn, setTurn] = useState(1)
    const [round, setRound] = useState(1)
    const [openWidget, setOpenWidget] = useState(false)



    const getActiveEncounter = async () => {
        let mons
        let someXp = 0
        let deets = []
        let players = []
        await axios.get(`/api/active/${id}`)
            .then(res => {
                // console.log(res.data.monsters)
                setActiveEncounter(res.data);
                setCampaignName(res.data.enccamps[0].campaign.campaignName);

                mons = res.data.monsters
                players = (res.data.enccamps[0].campaign.players)
            })
            .catch(err => console.log(err));

        for (let i = 0; i < mons.length; i++) {
            await axios.get(`https://www.dnd5eapi.co${mons[i].monsterUrl}`)
                .then(res => {
                    someXp += +res.data.xp
                    deets.push(res.data)
                })
        }
        // console.log(deets)
        setTotalXP(someXp)
        setNumOfMonsters(mons.length)
        setPlayers(players)
        setEntities([...deets, ...players])
        setShowStart(true)
    }
    function getChallengeRating() {
        let adjustedXp = 0
        // console.log("players", players)
        // console.log("initialXp", initialXp)
        // console.log("numOfMonsters", numOfMonsters)
        if (numOfMonsters === 0) { adjustedXp }
        if (numOfMonsters === 1) { adjustedXp = initialXp }
        if (numOfMonsters === 2) { adjustedXp = initialXp * 1.5 }
        if (numOfMonsters >= 3 && numOfMonsters < 7) { adjustedXp = initialXp * 2 }
        if (numOfMonsters >= 7 && numOfMonsters < 11) { adjustedXp = initialXp * 2.5 }
        if (numOfMonsters >= 11 && numOfMonsters < 15) { adjustedXp = initialXp * 3 }
        if (numOfMonsters >= 15) { adjustedXp = initialXp * 4 }
        // (console.log("adjustedXp",adjustedXp))
        const xpTable = {
            1: 300,
            2: 600,
            3: 1200,
            4: 1700,
            5: 3500,
            6: 4000,
            7: 5000,
            8: 6000,
            9: 7500,
            10: 9000,
            11: 10500,
            12: 11500,
            13: 13500,
            14: 15000,
            15: 18000,
            16: 20000,
            17: 25000,
            18: 27000,
            19: 30000,
            20: 40000,
        };
        const partyXpBudget = players.reduce((total, player) => {
            const level = player.playerLv
            const xp = xpTable[level] || 0
            return total + xp
        }, 0)
        // console.log("partyXpBudget", partyXpBudget)
        // console.log("adjustedXp", adjustedXp)
        setCalculatedXp(adjustedXp)
        setXpBudget(partyXpBudget)
        let difficultyLevel = 'N.A.'
        const difficultyMultipliers = {
            easy: 0.5, medium: 1, hard: 1.5, deadly: 2,
        }
        const ratio = adjustedXp / partyXpBudget
        // console.log("xp ratio", ratio)
        if (ratio <= difficultyMultipliers.easy) { difficultyLevel = "Easy" }
        else if (ratio <= difficultyMultipliers.medium) { difficultyLevel = "Medium" }
        else if (ratio <= difficultyMultipliers.hard) { difficultyLevel = "Hard" }
        else if (ratio <= difficultyMultipliers.deadly) { difficultyLevel = "Deadly" }
        else if (ratio > difficultyMultipliers.deadly) { difficultyLevel = "Impossible (TPK)" }
        setDifficulty(difficultyLevel)
        // console.log("difficulty", difficultyLevel)
    }
    let d20 = {
        sides: 20,
        roll: function () {
            let randomNumber = Math.floor(Math.random() * this.sides) + 1;
            return randomNumber;
        }
    }
    function initiativeRoll() {
        let calculatedEntities = entities.map(ent => {
            let initiative = d20.roll()
            if (ent.playerName) {
                ent.initiative = ent.playerInit + initiative
            } else {
                ent.initiative = initiative + Math.floor((ent.dexterity - 10) / 2)
            } return ent
        })
        let sortedEnts = calculatedEntities.sort((a, b) => {
            return (b.initiative - a.initiative)
        })
        let identifiedEnts = sortedEnts.map((ent, index) => (
            { ...ent, initiativeId: index }
        ))
        setEntities(identifiedEnts)
        setActiveEnt(identifiedEnts[0])
    }

    function nextTurn() {
        console.log(activeEnt, entities[entities.length - 1].initiativeId)
        // setTurn(turn === entities.length ? 1 : turn+1)
        if (turn === entities.length) {
            setTurn(1)
            setRound(round + 1)
        } else {
            setTurn(turn + 1)
        }
        setActiveEnt(activeEnt.initiativeId === entities[entities.length - 1].initiativeId ? entities[0] : entities[turn])
    }
    useEffect(() => { getActiveEncounter() }, []);



    return (activeEncounter &&
        <>
            <div className="border p-5 bg-gray-700 mt-32 mb-10">
                {showStart && <div>

                    <div className="vinque text-xl">
                        Pulling monsters from {activeEncounter.encounterName}...
                    </div>
                </div>}
                {!showStart &&
                    <>
                        <div className="flex w-full">

                            <div className="flex w-1/2 items-center">

                                {/* Next Button */}
                                <div className="">
                                    <button className="hover:text-blue-400 px-2 hover:border-blue-400 flex justify-center items-center mx-4 gap-1 border-solid rounded-sm border bg-slate-600" onClick={() => { nextTurn() }}>
                                        <div>next turn</div>
                                        <div><ChevronRight /></div>
                                    </button>
                                </div>

                                <div className="px-4">Active Turn: {turn}/{entities.length} </div>

                                {/* Round Counter */}
                                <div className="px-4">Round: {round}</div>
                            </div>

                            {/* Dice Widget */}
                            {/* <div className="w-1/2 px-4 self-end"><DiceWidget open={openWidget} setOpen={setOpenWidget} /></div> */}

                        </div>
                        <div className="flex my-5">
                            <ActiveCard
                                activeEnt={activeEnt}
                                entities={entities}
                                d20={d20} />
                        </div>
                        <p className="mb-4">XP for this encounter: {calculatedXp} </p>
                        <div className=" text-lg">Difficulty:
                            <p className={`${difficulty === "Easy" ? 'text-green-500' :
                                    difficulty === "Medium" ? 'text-yellow-600' :
                                        difficulty === "Hard" ? 'text-red-500' :
                                            difficulty === "Deadly" ? 'text-red-900' :
                                                'text-gray-900'
                                }`}>{difficulty}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <NavLink className="hover:text-blue-400 mt-4" to="/encounters">End Encounter</NavLink>
                        </div></>}
            </div>

            {showStart && <button className="hover:text-blue-400 exeter border-2 hover:border-blue-400 hover:bg-black/20 rounded-md p-2" onClick={() => { initiativeRoll(), getChallengeRating(); setShowStart(false); }}>Roll initiative!</button>}

        </>
    );
}
export default ActiveEncounters