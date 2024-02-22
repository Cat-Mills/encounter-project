import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import '../index.css';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { HelpIcon, Bug } from "../icons";



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
        <div>
            {userId ? (
                <div className=" flex justify-evenly pb-6 pt-6 mb-10 absolute top-0 w-full left-0 shadow-lg bg-[#3d404e] bg-opacity-70 z-50 vinque text-base sm:text-xl">
                    <NavLink className="navLink" to='/monsters' onClick={() => setCurrPage('Mons')}>Monsters</NavLink>
                    <NavLink className="navLink" to='/encounters' onClick={() => setCurrPage('Enc')}>Encounters</NavLink>
                    <NavLink className="navLink" to='/campaigns' onClick={() => setCurrPage('Cam')}>Campaigns</NavLink>
                    <NavLink className="navLink" to='/profile' onClick={() => setCurrPage('Prof')}>Profile</NavLink>
                    <NavLink className="navLink absolute top-24 right-14 hover:text-blue-400" to='/help' title="Help" onClick={() => setCurrPage('Help')}><HelpIcon/></NavLink>
                    <NavLink target="_blank" to={"https://github.com/Cat-Mills/encounter-project/issues"} title="Report a bug" className="navLink absolute top-24 right-4 hover:text-blue-400"><Bug/></NavLink>
                </div>
            ) : <div></div>}
        </div>
    )
}


export default Header