import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components'
import Button from '../styles/Button';

function Home({onLogin, selectedIndustryId, setSelectedIndustry, industries}) {
    const [showLogin, setShowLogin] = useState(true);

   return (
    <Div>
      <Wrapper>
          <Header>Welcome</Header>
          {showLogin ? (
              <>
              <Login onLogin={onLogin} />
              <Divider />
              <p>
                  Don't have an account? &nbsp;
                  <Button bg ='#000080' color='#fff' onClick={() => setShowLogin(false)}>
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
                  <Button bg ='#000080' color='#fff' onClick={() => setShowLogin(true)}> Log in</Button>
                  </p>
              </>
          )
      }
      </Wrapper>
    </Div>
  )
}

const Header = styled.h1`
    font-size: 3rem;
    color: #ADD8E6;
    margin: 8px 0 16px;
`

const Wrapper = styled.section`
  max-width: 500px;
  margin: 12rem auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

const Div = styled.div`
height: vh;
width: vw;
background-image: url(https://images.unsplash.com/photo-1511759066510-46958c3fffa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80);
`

export default Home
