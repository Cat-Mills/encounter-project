import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MonsterRows from '../Elements/MonsterParts/MonsterRows.jsx'
import SearchMonsters from '../Elements/MonsterParts/StatBlock.jsx'
import { PlaceholderImage, SearchIcon, Book } from '../icons.jsx'



const Monsters = () => {

  const [monsterList, setMonsterList] = useState([])
  const MONSTER_COLLECTION = 'https://www.dnd5eapi.co/api/monsters'
  const [showMonsterList, setShowMonsterList] = useState(true)
  const [filteredMons, setFilteredMons] = useState({ name: '', type: '' })

  const [filteredTypes, setFilteredTypes] =
    useState({
      book: false,
      aberration: false,
      beast: false,
      celestial: false,
      construct: false,
      dragon: false,
      elemental: false,
      fey: false,
      fiend: false,
      giant: false,
      humanoid: false,
      monstrosity: false,
      ooze: false,
      plant: false,
      undead: false
    })



  function getMonsters() {
    axios
      .get(MONSTER_COLLECTION)
      .then(res => {
        setMonsterList(res.data.results)
      })
      .catch(err => console.log(err))
  }

  function filterTypes(el) {
    let t = el.target.id
    console.log(t)
    let obj = filteredTypes
    obj[t] = !obj[t]
    setFilteredTypes(obj)
    
    
  }

  function filterResults() {
    return monsterList.filter((monster) => {
      return (monster.name.toLowerCase().includes(filteredMons.name.toLowerCase()))//returning a true or false
    })
  }

  useEffect(() => getMonsters(), [])

  return (
    <div className='border p-5 bg-gray-700 mt-32 mb-10'>
      {/* TAB Search Bar */}
      <div className='flex justify-center min-w-full items-center p-3 relative hover:text-blue-400'>
        <input className='block w-full p-px mb border bg-gray-600 hover:border-blue-400 hover:text-white focus:ring-transparent'
          onChange={(e) => {
            setFilteredMons({ ...filteredMons, name: e.target.value })
          }}
          value={filteredMons.name}
          type="text"
          id="monsterInput"
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
          <SearchIcon />
        </div>
      </div>

      {/* monster type buttons*/}
      <div className='flex w-full h-20 mt-3 justify-evenly'>
        {/* <input type='checkbox' id='book' name='monsterType' className='hidden peer/book' onChange={filterTypes} />
        <label
          htmlFor='book'
          className='typeButton hover:ring ring-gray-700 peer-checked/book:bg-gradient-to-tr from-gray-700 cursor-pointer select-none'
        >
          <Book />
        </label> */}

        <input onChange={filterTypes} type='checkbox' id='aberration' name='monsterType' className='hidden peer/aberration'/>
        <label
          htmlFor='aberration'
          className='typeButton hover:ring ring-purple-900 peer-checked/aberration:bg-gradient-to-tr from-purple-900 cursor-pointer select-none'
        >
          <PlaceholderImage type={'aberration'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='beast' name='monsterType' className='hidden peer/beast' />
        <label
          htmlFor='beast'
          className='typeButton hover:ring ring-amber-950 peer-checked/beast:bg-gradient-to-tr from-amber-950 cursor-pointer select-none'
        >
          <PlaceholderImage type={'beast'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='celestial' name='monsterType' className='hidden peer/celestial' />
        <label
          htmlFor='celestial'
          className='typeButton hover:ring ring-amber-600 peer-checked/celestial:bg-gradient-to-tr from-amber-600 cursor-pointer select-none'
        >
          <PlaceholderImage type={'celestial'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='construct' name='monsterType' className='hidden peer/construct' />
        <label
          htmlFor='construct'
          className='typeButton hover:ring ring-zinc-800 peer-checked/construct:bg-gradient-to-tr from-zinc-800 cursor-pointer select-none'
        >
          <PlaceholderImage type={'construct'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='dragon' name='monsterType' className='hidden peer/dragon' />
        <label
          htmlFor='dragon'
          className='typeButton hover:ring ring-rose-950 peer-checked/dragon:bg-gradient-to-tr from-rose-950 cursor-pointer select-none'
        >
          <PlaceholderImage type={'dragon'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='elemental' name='monsterType' className='hidden peer/elemental' />
        <label
          htmlFor='elemental'
          className='typeButton hover:ring ring-blue-700 peer-checked/elemental:bg-gradient-to-tr from-blue-700 cursor-pointer select-none'
        >
          <PlaceholderImage type={'elemental'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='fey' name='monsterType' className='hidden peer/fey' />
        <label
          htmlFor='fey'
          className='typeButton hover:ring ring-fuchsia-600 peer-checked/fey:bg-gradient-to-tr from-fuchsia-600 cursor-pointer select-none'
        >
          <PlaceholderImage type={'fey'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='fiend' name='monsterType' className='hidden peer/fiend' />
        <label
          htmlFor='fiend'
          className='typeButton hover:ring ring-red-800 peer-checked/fiend:bg-gradient-to-tr from-red-800 cursor-pointer select-none'
        >
          <PlaceholderImage type={'fiend'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='giant' name='monsterType' className='hidden peer/giant' />
        <label
          htmlFor='giant'
          className='typeButton hover:ring ring-orange-950 peer-checked/giant:bg-gradient-to-tr from-orange-950 cursor-pointer select-none'
        >
          <PlaceholderImage type={'giant'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='humanoid' name='monsterType' className='hidden peer/humanoid' />
        <label
          htmlFor='humanoid'
          className='typeButton hover:ring ring-stone-400 peer-checked/humanoid:bg-gradient-to-tr from-stone-800 cursor-pointer select-none'
        >
          <PlaceholderImage type={'humanoid'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='monstrosity' name='monsterType' className='hidden peer/monstrosity' />
        <label
          htmlFor='monstrosity'
          className='typeButton hover:ring ring-violet-950 peer-checked/monstrosity:bg-gradient-to-tr from-violet-950 cursor-pointer select-none'
        >
          <PlaceholderImage type={'monstrosity'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='ooze' name='monsterType' className='hidden peer/ooze' />
        <label
          htmlFor='ooze'
          className='typeButton hover:ring ring-teal-400 peer-checked/ooze:bg-gradient-to-tr from-teal-400 cursor-pointer select-none'
        >
          <PlaceholderImage type={'ooze'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='plant' name='monsterType' className='hidden peer/plant' />
        <label
          htmlFor='plant'
          className='typeButton hover:ring ring-green-800 peer-checked/plant:bg-gradient-to-tr from-green-800 cursor-pointer select-none'
        >
          <PlaceholderImage type={'plant'} />
        </label>

        <input onChange={filterTypes} type='checkbox' id='undead' name='monsterType' className='hidden peer/undead' />
        <label
          htmlFor='undead'
          className='typeButton hover:ring ring-gray-400 peer-checked/undead:bg-gradient-to-tr from-gray-400 cursor-pointer select-none'
        >
          <PlaceholderImage type={'undead'} />
        </label>
      </div>



      {filteredMons.name && <div className='flex justify-start p-3'>Search results:</div>}
      {!filteredMons.name && <h2 className='flex justify-start p-3'>Monsters:</h2>}

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