import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    font-size: 12px;
    font-family: 'Lato', sans-serif;
    background-color: #4F646F;
    border-radius: 2%;
    position: sticky;
    top: 0;
    z-index: 999;
    height: 80px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    align-content: center;
    margin: auto;
`

export const NavLink = styled(Link)`
    font-family: 'Lato', sans-serif;  
    font-size: 1.5rem;
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;
    color: #F4FAFF;
    cursor: pointer;
    padding-right: 100px;
    transition: all .5s ease;
    &:hover{
        text-decoration: underline;
        transform: scale(1.08);
        opacity: 0.8;
    }
`

export const Logo = styled.div`
    color: #000080;
    padding-left: 30px;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 4rem;
    font-weight: 800;
`

//Add media styling?
