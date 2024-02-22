import React from 'react'

export default function Register({ username, password, setPassword, setUsername, handleFormSubmit }) {
    return (
        // <div className='flex flex-col mt-5 h-full justify-center relative self-center'>
        //     <h3 className='mb-10 absolute top-0 right-0 left-0'>Please Create An Account</h3>
        //     <form className='' onSubmit={e => handleFormSubmit(e)}>
        //         <div className='vinque text-xl'>
        //             <input type="text" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
        //             <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
        //             <button>Submit</button>
        //         </div>
        //     </form>
        // </div>
        <div className='flex flex-col mt-5 h-full justify-center relative self-center'>
            <h3 className=' self-center'>Create Account</h3>
            <form className='flex justify-center h-full' onSubmit={e => handleFormSubmit(e)}>
                <div className='vinque text-base sm:text-xl flex flex-col justify-center gap-y-6 mt-8 '>
                    <input className='placeholder: text-center text-s sm:text-lg bg-transparent border border-solid' type="text" placeholder='set username' value={username} onChange={e => setUsername(e.target.value)} />
                    <input className='placeholder: text-center text-s sm:text-lg bg-transparent border border-solid' type="password" placeholder='set password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='border-2 border-solid w-1/2 self-center '>Submit</button>
                </div>
            </form>
        </div>
    )
}
