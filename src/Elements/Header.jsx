import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import '../index.css';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


//TODO Render tabs if signed in.
//useEffect to check if there is a user on the session
//if user, render Header. if not, do not display tabs.
//apply style difference to current page



const Header = () => {
    const [currPage, setCurrPage] = useState('')
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userId)

    useEffect(() => {
        axios
            .get("/api/user")
            .then(res => dispatch({type: "LOGIN", payload: res.data.userId}))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {userId ? (
                <div className="flex justify-evenly w-full pb-9 pt-3">
                    <NavLink className={currPage === 'Mons' && 'text-red-900'} to='/monsters' onClick={() => setCurrPage('Mons')}>Monsters</NavLink>
                    <NavLink className={currPage === 'Enc' && 'text-red-900'} to='/encounters' onClick={() => setCurrPage('Enc')}>Encounters</NavLink>
                    <NavLink className={currPage === 'Cam' && 'text-red-900'} to='/campaigns' onClick={() => setCurrPage('Cam')}>Campaigns</NavLink>
                    <NavLink className={currPage === 'Prof' && 'text-red-900'} to='/profile' onClick={() => setCurrPage('Prof')}>Profile</NavLink>
                </div>
            ) : null}
        </>
    )
}


export default Header