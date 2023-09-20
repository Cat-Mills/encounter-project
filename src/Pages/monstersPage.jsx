import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Monsters = () => {

  const [Monsters, setMonsters] = useState([])
  const MONSTER_COLLECTION = 'https://www.dnd5eapi.co/api/monsters'

  function getMonsters(){
    axios
    .get(MONSTER_COLLECTION)
    .then(res => {
      console.log(res.data)
      setMonsters(res.data)
    })
    .catch(err => console.log(err))
  }
  
  function displayMonsters(){
    //? loop over monsters
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
  }
  
  useEffect(()=> getMonsters(), [])

  return (
    <div>Monsters
      {/* make a next and back button for 25 mons */}
    </div>
  )
}

export default Monsters