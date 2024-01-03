import React from 'react'
import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react'


export default function DiceWidget() {
    let [selectedDice, setSelectedDice] = useState("")
    let [rollMod, setRollMod] = useState(0)
    let [total, setTotal] = useState(null)

    const dice = [
        {
            name: "d20",
            sides: 20,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
        {
            name: "d12",
            sides: 12,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
        {
            name: "d10",
            sides: 10,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
        {
            name: "d8",
            sides: 8,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
        {
            name: "d6",
            sides: 6,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
        {
            name: "d4",
            sides: 4,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
        {
            name: "d100",
            sides: 100,
            roll: function () {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        },
    ]
    function handleRoll() {
        let result
        dice.forEach((d)=>{
            if(d.name == selectedDice) {
                return result = d.roll()
            }
        })
        setTotal(Number(rollMod)+result)
        // console.log('result',result)
        // console.log('modifier',Number(rollMod))
        // console.log('total', total=Number(rollMod)+result)
        
    }


    return (
        <div className='flex w-full justify-end'>
            <Popover className="flex overflow-x-hidden rounded-e-full w-full justify-end">
                <Transition
                    enter="transition ease-in-out duration-[600ms] transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-[600ms] transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >

                    <Popover.Panel className="flex flex-row-reverse">
                        <button
                            className='hover:text-blue-400 hover:border-blue-400 bg-slate-500 hover:bg-black/20 border-2 focus:outline-none px-2 mr-2 rounded-full'
                            onClick={() => handleRoll()}
                        >Roll</button>
                        <div className='flex gap-1 items-center mx-2 px-2 bg-slate-500 rounded-full'>
                            <div>Modifier:</div>
                            <input className='opacity-1 bg-slate-500 m-1 p-0.5 w-10 focus:outline-none' type="number" placeholder='0' onChange={(e) => setRollMod(e.target.value)} />
                        </div>
                        <div className='px-4 py-2 gap-4 flex bg-slate-500 rounded-full'>
                            {dice.map((die) => (
                                <button key={die.name} className='relative focus:outline-none' onClick={() => { setSelectedDice(die.name) }}>
                                    {die.name}
                                    {selectedDice === die.name && <div className={`absolute border-4 border-blue-300 shadow-sm shadow-black rounded-full font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 `}></div>}
                                </button>
                            ))}
                        </div>
                        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 pt-1'>Result: {selectedDice} + {rollMod} = {total}</div>
                    </Popover.Panel>

                </Transition>

                <Popover.Button className="hover:text-blue-400 hover:border-blue-400 shadow-inner shadow-black border-2 bg-gray-600 hover:bg-black/20 focus:outline-none rounded-full ui-open:bg-slate-500 ui-open:shadow-none p-4 my-2 z-20">Dice</Popover.Button>

            </Popover>
        </div>
    )
}
