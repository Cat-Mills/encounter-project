import React from 'react'


export default function Login({username, password, setPassword, setUsername, handleFormSubmit}) {
    return (
        <div className='flex my-5 justify-around'>
            <form onSubmit={e => handleFormSubmit(e)}>
                <h3 className='mb-10'>Please Login</h3>
                <input type="text" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
    )
}
