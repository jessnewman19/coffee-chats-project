import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components'
import Button from '../styles/Button';

function Home({onLogin}) {
    const [showLogin, setShowLogin] = useState(true);

   return (
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
                <Signup onLogin={onLogin} />
                <Divider />
                <p>
                Already have an account? &nbsp;
                <Button bg ='#000080' color='#fff' onClick={() => setShowLogin(true)}> Log in</Button>
                </p>
            </>
        )
    }
    </Wrapper>
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

export default Home