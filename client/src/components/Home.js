import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components'
import Button from '../styles/Button';

function Home({onLogin, selectedIndustryId, setSelectedIndustry, industries, isUser, setIsUser}) {
    const [showLogin, setShowLogin] = useState(true);
  
   return (
    <div style={{display: 'flex'}}>
      <Wrapper>
          {showLogin ? (
              <>
              <Header>Welcome to coffee chats!</Header>
            <P style={{color: '#4F646F', padding: '10px', margin: 0}}>Please log in or sign up below!</P>
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
                <P style={{color: '#4F646F', padding: '10px', marginTop: 100, fontSize: '2rem'}}>Please sign up below!</P>
                  <Signup onLogin={onLogin} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} isUser={isUser} setIsUser={setIsUser}/>
                  <Divider />
                  <P>
                  Already have an account? &nbsp;
                  <Button bg ='#4F646F' color='#F4FAFF' onClick={() => setShowLogin(true)} isUser={isUser}> Log in</Button>
                  </P>
              </>
          )
      }
      </Wrapper>
    </div>
  )
}

const Header = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 3rem;
    color: #4F646F;
    margin: 8px 0 16px;
    text-align: center;
`

const Wrapper = styled.div`
    left: 0; 
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-y:scroll;
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
