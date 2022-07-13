import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components'
import Button from '../styles/Button';

function Home({onLogin, selectedIndustryId, setSelectedIndustry, industries, isUser, setIsUser}) {
    const [showLogin, setShowLogin] = useState(true);
  
   return (
    <div style={{display: 'flex'}}>
      <LoginWrapper>
          <Header>Welcome to coffee chats!</Header>
          <P style={{color: '#4F646F', padding: '10px', margin: 0}}>Please log in or sign up below</P>
          {showLogin ? (
              <>
              <Login onLogin={onLogin} isUser={isUser} setIsUser={setIsUser}/>
              <Divider />
              <P>
                  Don't have an account? &nbsp;
                  <Button bg ='#4F646F' color='#F4FAFF' onClick={() => setShowLogin(false)}>
                  Sign Up
                  </Button>
              </P>
              </>
        ) : (
              <>
                  <Signup onLogin={onLogin} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} isUser={isUser} setIsUser={setIsUser}/>
                  <Divider />
                  <P>
                  Already have an account? &nbsp;
                  <Button bg ='#4F646F' color='#F4FAFF' onClick={() => setShowLogin(true)} isUser={isUser}> Log in</Button>
                  </P>
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
    color: #4F646F;
    margin: 8px 0 16px;
`

const LoginWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    background: linear-gradient(#F4FAFF, #DEE7E7, #B7ADCF, #4F646F, #535657);
`;

const Divider = styled.hr`
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 10px 0;
`;

const P = styled.p`
    font-family: 'Lato', sans-serif;  
`

export default Home
