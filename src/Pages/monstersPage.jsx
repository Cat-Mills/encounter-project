import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MonsterRows from '../Elements/MonsterParts/MonsterRows.jsx'
import SearchMonsters from '../Elements/MonsterParts/SearchMonsters.jsx'

const Monsters = () => {

  const [monsterList, setMonsterList] = useState([])
  const MONSTER_COLLECTION = 'https://www.dnd5eapi.co/api/monsters'
  const [monsterName, setMonsterName] = useState('')

  function getMonsters(){
    axios
    .get(MONSTER_COLLECTION)
    .then(res => {
      setMonsterList(res.data.results)
    })
    .catch(err => console.log(err))
    // console.log(monsterList)
  }
  
  // function displayMonsters(){
  //   //? loop over monsters
  //   monsterList.map((monster) => {
  //     <ul key={monster.index}>
  //       <p>{console.log(monster.index)}</p>
  //       <li > {monster.index} </li>
  //     </ul>
  //   })}
    
    //? grab first 25

// 1st page:
// query {
//   monsters(limit: 100) {
//     name
//   }
// }
// 2nd page:
// query {
//   monsters(limit: 100, skip: 100) {
//     name
//   }
// }

    //? display on page
    //? have an onClick for each that sends new axios request to get specific monster data
  
  
  useEffect(()=> getMonsters(), [])
  
  return (
    <div>
      <SearchMonsters/>
      <h2>Monsters:</h2>
      <MonsterRows
      monsterList={monsterList}
      setMonsterList={setMonsterList}
      />
      {/* <button onClick={() => displayMonsters()}></button> */}
      {/* make a next and back button for 25 mons */}
    </div>
  )
}

export default Monsters