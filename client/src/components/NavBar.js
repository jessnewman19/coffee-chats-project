import React from 'react'; 
import {Nav, NavLink} from '../styles/Nav'; 
import Button from '../styles/Button';
import NavBarContainer from '../styles/NavBarContainer';

function NavBar({setUser}) {
    
    function handleLogout() { 
        fetch("/logout", { 
            method: "DELETE"
        })
        .then(r => { 
            if (r.ok) { 
                setUser(null)
            }
        })
    }

  return (
    <Nav>
        <NavBarContainer>
            <NavLink to="dashboard">
                Dashboard
            </NavLink>
            <NavLink to="connections">
                Connections
            </NavLink>
            <NavLink to="about">
                About
            </NavLink>
            <Button onClick={handleLogout} bg ='#000080' color='#fff'>
                Logout
            </Button>
        </NavBarContainer>
    </Nav>
  )
}
export default NavBar