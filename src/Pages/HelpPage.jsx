import React from 'react'

export default function HelpPage() {
  return (
    <div className='w-full h-full flex flex-col'>
        <div className=' text-3xl vinque m-6'>How to Get Started</div>
        <div className='text-xl exeter w-1/2 self-center h-full'>
            <ol className=' list-decimal text-left gap-y-2'>
                <li>Create a campaign. Expand the campaign to add a player.</li>
                <li>Add your players and their current stats.</li>
                <li>Create an encounter and assign it to your campaign.</li>
                <li>Browse or search for a monster and add it to your encounter</li>
                <li>Press play on the encounter to see the calculated difficulty level and xp gain.</li>
                <li>If you are satisfied, run your encounter anytime you like!</li>
                <li>(bonus tip: you can keep track of hitpoints in the active encounter)</li>
            </ol>
        </div>
        
    </div>
  )
}
