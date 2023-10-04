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
  const [filteredMons, setFilteredMons ] = useState({name:'',type:''})
  

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
      return(monster.name.toLowerCase().includes(filteredMons.name.toLowerCase()))//returning a true or false
    })
  }
  
  useEffect(()=> getMonsters(), [])
  
  return (
    <div className='border p-5 bg-gray-700 mt-32 mb-10'>
      {/* TAB Search Bar */}
      <div className='flex justify-center min-w-full items-center p-3 relative hover:text-blue-400'>
        <input className='block w-full p-px mb border bg-gray-600 hover:border-blue-400 hover:text-white focus:ring-transparent'
          onChange={(e) => {
          setFilteredMons({...filteredMons, name: e.target.value}) }} 
          value={filteredMons.name} 
          type="text" 
          id="monsterInput"
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
        <SearchIcon/>
        </div>
      </div>

        {filteredMons && <div className='flex justify-start p-3 mt-10'>Search results:</div>}
      {!filteredMons && <h2 className='flex justify-start p-3 mt-10'>Monsters:</h2>}

      {/*TAB Monster Rows */}
      {showMonsterList && <MonsterRows
      itemsPerPage={25}
      monsterList={filteredMons ? filterResults(filteredMons) : monsterList}
      setMonsterList={setMonsterList}
      searchText={filteredMons}
      />}

    </div>
  )
}

export default Monsters