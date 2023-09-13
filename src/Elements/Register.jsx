import React from 'react'

export default function Register({ username, password, setPassword, setUsername, handleFormSubmit }) {
    return (
        <div>
            <form onSubmit={e => handleFormSubmit(e)}>
                <h3>Please Create An Account</h3>
                <input type="text" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}
