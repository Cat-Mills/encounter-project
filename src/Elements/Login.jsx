import React from 'react'


export default function Login({ username, password, setPassword, setUsername, handleFormSubmit }) {
    return (
        <div className='flex flex-col mt-5 h-full justify-center relative self-center'>
            <h3 className='mb-10 absolute top-0 right-0 left-0'>Please Login</h3>
            <form className='flex justify-center' onSubmit={e => handleFormSubmit(e)}>
                <div className='vinque text-xl'>
                    <input type="text" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}
