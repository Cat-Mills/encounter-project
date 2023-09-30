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
    <div className='border p-5 bg-gray-700 mt-32'>
      <div className='flex justify-center min-w-full items-center p-3 relative hover:text-blue-400'>
        <input className='block w-full p-px mb border bg-gray-600 hover:border-blue-400 hover:text-white focus:ring-transparent'
          onChange={(e) => {
          setSearchText(e.target.value) }} 
          value={searchText} 
          type="text" 
          id="monsterInput"
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
        <SearchIcon/>
        </div>
      </div>
        {searchText && <div className='flex justify-start p-3 mt-10'>Search results:</div>}
      {!searchText && <h2 className='flex justify-start p-3 mt-10'>Monsters:</h2>}
      {showMonsterList && <MonsterRows
      itemsPerPage={25}
      filteredMonsterList={filteredMonsterList}
      setFilteredMonsterList={setFilteredMonsterList}
      monsterList={searchText ? filterResults(searchText) : monsterList}
      setMonsterList={setMonsterList}
      />}
    </div>
  )
}

export default Monsters