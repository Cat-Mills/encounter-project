import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import StatBlock from "./StatBlock"
import { ChevronLeft, ChevronRight, Bookmark} from "../../icons"


export default function MonsterRows({monsterList, itemsPerPage, searchText, types, isRows, bookmarkedMonsters, setBookmarkedMonsters}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [counter, setCounter] = useState(0)
    
    const totalPages = Math.ceil(monsterList.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage

    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentItems = monsterList.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    useEffect(()=>setCurrentPage(1),[searchText,types])
    // console.log(types)
return(
<div className=" max-h-[65vh] overflow-scroll overflow-x-hidden pl-5 sm:px-5 md:pl-14">
    <div className={`${!isRows ? 'grid grid-cols-3 xl:grid-cols-4 gap-4' : 'null'}`}>
    {monsterList.map((monster, monsterIn) => {
            return <StatBlock 
                url={monster.url} 
                name={monster.name} 
                types={types} 
                key={monster.url} 
                monsterIn={monsterIn} 
                indexOfFirstItem={indexOfFirstItem} 
                indexOfLastItem={indexOfLastItem} 
                currentPage={currentPage} 
                counter={counter} 
                setCounter={setCounter}
                isRows={isRows}
                bookmarkedMonsters={bookmarkedMonsters}
                setBookmarkedMonsters={setBookmarkedMonsters}
            />
        })}
    </div>

{/* Page navigation tabs */}
    {types.length < 1 && <div className="flex gap-2 justify-around mx-14 my-4">
        <button className={currentPage === 1 ? `text-gray-500`: `hover:text-blue-400`} onClick={previousPage} disabled={currentPage === 1}><ChevronLeft/></button>
        {Array.from({ length: totalPages }).map((_, index) => (
            <div key={index} className="">
                <button className={index+1===currentPage?`text-blue-400`:``} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
            </div>
        ))}
        <button className={currentPage === totalPages ? `text-gray-500`: `hover:text-blue-400`} onClick={nextPage} disabled={currentPage === totalPages} ><ChevronRight/></button>
    </div>}
</div>
    )
}

