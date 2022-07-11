import React from 'react'; 
import {UserContext} from "../context/UserProvider";

//Import styled components
import {Nav, NavLink} from '../styles/Nav'; 
import Button from '../styles/Button';
import NavBarContainer from '../styles/NavBarContainer';

function NavBar({setUser, isUser}) {

    function handleLogout() { 
        fetch("/logout", { 
            method: "DELETE"
        })
        .then(r => { 
            if (r.ok) { 
                setUser(UserContext)
            }
        })
    }

  return (
    <Nav>
        <NavBarContainer>
            <NavLink to="dashboard">
                Dashboard
            </NavLink>
            {isUser === "User" ? <NavLink to="connections">Connections</NavLink> : <NavLink to="pending">Pending</NavLink>}
            <NavLink to="about">
                About
            </NavLink>
            <Button onClick={handleLogout} bg ='#F4FAFF' color='#4F646F'>
                Logout
            </Button>
        </NavBarContainer>
    </Nav>
  )
}
export default NavBar