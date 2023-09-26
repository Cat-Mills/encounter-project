import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import StatBlock from "./StatBlock"
import { ChevronLeft, ChevronRight, Plus, More, X } from "../../icons"


export default function MonsterRows({monsterList, itemsPerPage}) {
    const [currentPage, setCurrentPage] = useState(1)
    
    const [showStatBlock, setShowStatBlock] = useState(false)


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
    
    
    

return(
<div className="">

    {currentItems.map((monster) => (
        <div key={monster.url}>
            <div className="m-2">
                <div className="border flex justify-between m-2 p-2 bg-gray-600 ">
                <h2 className="font-bold capitalize text-lg">{monster.name} </h2>
                
                </div>
                <StatBlock url={monster.url}/>
            </div>
        </div>
    ))}

{/* Page navigation tabs */}
    <div className="flex gap-2 justify-around mx-14 my-4">
        <button className={currentPage === 1 ? `text-gray-500`: `hover:text-blue-400`} onClick={previousPage} disabled={currentPage === 1}><ChevronLeft/></button>
        {Array.from({ length: totalPages }).map((_, index) => (
            <div key={index} className="">
                <button className={index+1===currentPage?`text-blue-400`:``} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </button>
            </div>
        ))}
        <button className={currentPage === totalPages ? `text-gray-500`: `hover:text-blue-400`} onClick={nextPage} disabled={currentPage === totalPages} ><ChevronRight/></button>
    </div>
</div>
    )
}

