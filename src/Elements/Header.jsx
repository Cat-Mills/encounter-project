import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/monsters'>Monsters</NavLink>
            <NavLink to='/encounters'>Encounters</NavLink>
            <NavLink to='/campaigns'>Campaigns</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
    )
}

export default Header