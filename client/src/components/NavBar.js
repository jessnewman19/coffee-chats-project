import React from 'react'; 

//Import styled components
import {Nav, NavLink} from '../styles/Nav'; 
import Button from '../styles/Button';
import NavBarContainer from '../styles/NavBarContainer';

function NavBar({setUser}) {
    const userStatus = localStorage.getItem('isUser')


    function handleLogout() { 
        fetch("/logout", { 
            method: "DELETE"
        })
        .then(r => { 
            if (r.ok) { 
                setUser(null)
                localStorage.removeItem('isUser')
            }
        })
    }

  return (
    <Nav>
        <NavBarContainer>
            <NavLink to="dashboard">
                Dashboard
            </NavLink>
            {userStatus === "User" ? <NavLink to="connections">Connections</NavLink> : null}
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