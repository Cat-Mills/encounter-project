import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MonsterRows from '../Elements/MonsterParts/MonsterRows.jsx'
import SearchMonsters from '../Elements/MonsterParts/StatBlock.jsx'
import {SearchIcon} from '../icons.jsx'


const Monsters = () => {

  const [monsterList, setMonsterList] = useState([])
  const MONSTER_COLLECTION = 'https://www.dnd5eapi.co/api/monsters'
  const [showMonsterList, setShowMonsterList] = useState(true)
  const [searchText, setSearchText] = useState('')

const [filteredMonsterList, setFilteredMonsterList] = useState({})

  function getMonsters(){
    axios
    .get(MONSTER_COLLECTION)
    .then(res => {
      setMonsterList(res.data.results)
    })
    .catch(err => console.log(err))
  }



  function filterResults(){
    
    return monsterList.filter((monster) => {
      return(monster.name.toLowerCase().includes(searchText.toLowerCase()))
    })
  }
  // console.log("monster list")
  // console.log(filterResults(searchText))
  
  useEffect(()=> getMonsters(), [])
  
  return (
    <div>
      <div className='flex justify-center min-w-full items-center p-3'>
        <input className=' w-full'
          onChange={(e) => {
          setSearchText(e.target.value) }} 
          value={searchText} 
          type="text" 
          id="monsterInput"
          placeholder=' search'
        />
        
        <SearchIcon className='z-10 '/>
        
      </div>
      <h2 className='flex justify-start p-3'>Monsters:</h2>
      {showMonsterList && <MonsterRows
      filteredMonsterList={filteredMonsterList}
      setFilteredMonsterList={setFilteredMonsterList}
      monsterList={searchText ? filterResults(searchText) : monsterList}
      setMonsterList={setMonsterList}
      />}
    </div>
  )
}

export default Monsters