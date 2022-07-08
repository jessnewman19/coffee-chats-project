import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components'
import Button from '../styles/Button';

function Home({onLogin, selectedIndustryId, setSelectedIndustry, industries}) {
    const [showLogin, setShowLogin] = useState(true);

   return (
    <div style={{display: 'flex'}}>
      <VisualWrapper>
      </VisualWrapper>
      <LoginWrapper>
          <Header>Welcome</Header>
          {showLogin ? (
              <>
              <Login onLogin={onLogin} />
              <Divider />
              <p>
                  Don't have an account? &nbsp;
                  <Button bg ='#4F646F' color='#F4FAFF' onClick={() => setShowLogin(false)}>
                  Sign Up
                  </Button>
              </p>
              </>
        ) : (
              <>
                  <Signup onLogin={onLogin} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} />
                  <Divider />
                  <p>
                  Already have an account? &nbsp;
                  <Button bg ='#4F646F' color='#F4FAFF' onClick={() => setShowLogin(true)}> Log in</Button>
                  </p>
              </>
          )
      }
      </LoginWrapper>
      </div>
  )
}

const Header = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 3rem;
    color: #ADD8E6;
    margin: 8px 0 16px;
`
const VisualWrapper=styled.section`
    width: 50vw;
    height: 100vh;
    display: flex;
    background-image: url("https://images.unsplash.com/photo-1573884054824-95ec03df17da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");
    background-position: 50% 50%;
    background-size: cover;
    `

const LoginWrapper = styled.section`
    width: 50vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
`;

const Divider = styled.hr`
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 10px 0;
`;

export default Home
