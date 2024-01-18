import React from 'react'


export default function Login({ username, password, setPassword, setUsername, handleFormSubmit }) {
    return (
        <div className='flex flex-col mt-5 h-full justify-center relative self-center'>
            <h3 className=' self-center'>Please Login</h3>
            <form className='flex justify-center h-full' onSubmit={e => handleFormSubmit(e)}>
                <div className='vinque text-base sm:text-xl flex flex-col justify-center gap-y-6 mt-8 '>
                    <input className='placeholder: text-center text-xs sm:text-lg bg-transparent border border-solid' type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
                    <input className='placeholder: text-center text-xs sm:text-lg bg-transparent border border-solid' type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='border-2 border-solid w-1/2 self-center '>Submit</button>
                </div>
            </form>
        </div>
    )
}
