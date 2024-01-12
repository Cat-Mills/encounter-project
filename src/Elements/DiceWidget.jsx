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
            <Popover className="flex rounded-e-full w-full justify-end">
                <Transition
                    enter="transition ease-in-out duration-[600ms] transform"
                    enterFrom="translate-y-[150%]"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-[600ms] transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-[150%]"
                >

                    <Popover.Panel className="flex flex-col fixed translate-x-full left-3 m-3 mx-6 h-[50vh]">

                        <button
                            className='hover:text-blue-400 hover:border-blue-400 bg-slate-500 shadow-sm shadow-black hover:bg-black/20 border-2 py-2 focus:outline-none rounded-full'
                            onClick={() => handleRoll()}>Roll
                        </button>

                        <div className='flex flex-col justify-center my-3 py-3 shadow-sm shadow-black bg-slate-500 rounded-full'>
                            <div>bonus:</div>
                            <input className='opacity-1 bg-transparent w-12 focus:outline-none self-center' type="number" placeholder='0' onChange={(e) => setRollMod(e.target.value)} />
                        </div>
                        <div className='px-4 py-2 flex-col h-full justify-around shadow-sm shadow-black bg-slate-500 rounded-full'>
                            {dice.map((die) => (
                                <button key={die.name} className='relative focus:outline-none py-2' onClick={() => { setSelectedDice(die.name) }}>
                                    {die.name}
                                    {selectedDice === die.name && <div className={`absolute border-4 border-blue-300 shadow-sm shadow-black rounded-full font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 `}></div>}
                                </button>
                            ))}
                        </div>
                        <div className='w-32 fixed top-0 right-full -translate-x-28 pt-1'>Roll Result: 
                            {total && <div className='text-xl flex justify-center'> {selectedDice}{<div className='flex'>{rollMod >= 0 && <div>+</div>}{rollMod}</div>} = {total}</div>}
                        </div>
                    </Popover.Panel>

                </Transition>

                <Popover.Button className="hover:text-blue-400 hover:border-blue-400  ui-open:shadow-black border-2 bg-gray-600 hover:bg-black/20 focus:outline-none rounded-full ui-open:bg-slate-500 ui-open:shadow-inner p-4 my-2 z-20">Dice</Popover.Button>

            </Popover>
        </div>
    )
}
