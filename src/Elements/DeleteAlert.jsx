import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function DeleteAlert({viewAlert,setViewAlert, deleteFunc,itemName}) {

    const [isOpen, setIsOpen] = useState(true)
    
    return (
        
        <Dialog as='div' open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 exeter">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-600 p-6 text-center align-middle shadow-xl transition-all">
                    <Dialog.Title as='h3' className="text-xl text-white">Delete {itemName}</Dialog.Title>
                    <div className='mt-2'>
                    
                    <p className='text-lg text-red-400'>
                        Are you sure you want to delete {itemName}? All of your data
                        will be permanently removed. This action cannot be undone.
                    </p>
                    </div>
                    <div className='mt-4 flex justify-around'>
                    <button type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-2 py-1 text-md font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" onClick={()=> deleteFunc(viewAlert)}>Delete</button>
                    <button type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-2 py-1 text-md font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" onClick={() => {setIsOpen(false);setViewAlert('')}}>Cancel</button>
                    </div>
                </Dialog.Panel>
                </div>
            </div>
        </Dialog>
        
    )
}