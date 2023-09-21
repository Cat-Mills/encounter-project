import axios from "axios"


export default function SearchMonsters({monsterList}) {

const monsterResult = document.getElementById("monsterResult")
const monsterInput = document.getElementById("monsterInput")
// const handleSearch = document.getElementById("handleSearch")

const handleSearch = (e) =>{
    e.preventDefault()
const monsterName = monsterInput.value.toLowerCase()
if(monsterName){
    searchMon(monsterName)
} else {
    monsterResult.innerHTML = "please enter a monster name"
}}
function searchMon(monsterName){
    monsterResult.innerHTML = "Searching..."

    axios.get(`https://www.dnd5eapi.co/api/monsters`)
    .then(response => {
        const monsters = response.data.results
        const matchedMonster = monsters.find(
        (monster) => monster.name.toLowerCase() === monsterName)
        // console.log(matchedMonster)
        if(matchedMonster){
            axios
            .get(matchedMonster.url)
            // console.log(matchedMonster.url)
            .then((monsterResponse) => {
                const monsterData = monsterResponse.data
                // console.log(monsterResponse.data)
                monsterResult.innerHTML = `
                <h2>${matchedMonster.name}</h2>
                <p>Index: ${matchedMonster.index}</p>
                `
            })
            .catch(error => {
                monsterResult.innerHTML = "Error fetching monster details"
            })
        } else {
            monsterResult.innerHTML = "Monster not found"
        }
    })
    .catch(err => {
        monsterResult.innerHTML = "Error fetching monsters"
    })
}

    return(
        <div>Search |
            <input type="text" id="monsterInput"
            placeholder="Enter a monster name" />
            <button onClick={(e)=> handleSearch(e)}>?</button>
            <div id="monsterResult"> </div>
        </div>
    )
}