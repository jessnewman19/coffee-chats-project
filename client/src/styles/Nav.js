import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    font-size: 12px;
    position: sticky;
    top: 0;
    z-index: 999;
    height: 80px;
    background-color: #D3D3D3;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
`
export const NavLink = styled(Link)`
    color: #000080;
    cursor: pointer;
    padding-right: 100px;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 800;
    transition: all .5s ease;
    &:hover{
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