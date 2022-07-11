import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

//styled components 
import styled from 'styled-components';
import FormDiv from '../styles/FormDiv';
import Label from '../styles/Label';
import Input from '../styles/Input';
import Button from '../styles/Button';
import Error from '../styles/Error';

function Login({onLogin, isUser, setIsUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()

 function handleSubmit(e) { 
        e.preventDefault()
        setIsLoading(true)
        if (isUser === "User") { 
            fetch("/login", { 
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            }).then(r => { 
                setIsLoading(false)
                if (r.ok) { 
                    r.json().then(user => onLogin(user))
                } else { 
                    r.json().then(error => setErrors(error.errors))
                }
            })
        } else if (isUser === "Professional") { 
            fetch("/professional/login", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            }).then(r => {
                setIsLoading(false)
                if (r.ok) { 
                    r.json().then(user => onLogin(user))
                } else { 
                    r.json().then(error => setErrors(error.errors))
                }
            })
            .catch(error => console.log(error.message));
        }
        history.push("/dashboard")
    }

  return (
    <form onSubmit={handleSubmit}> 
        <FormDiv> 
            <Label>Username: </Label>
            <Input
            type="text" 
            id="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </FormDiv>
        <FormDiv>
            <Label>Password: </Label>
            <Input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </FormDiv>
        <FormDiv> 
            <Label>User or professional?</Label>
            <Select name = "isUser" id="isUser" defaultValue="default" onChange={(e) => setIsUser(e.target.value)}>
                <option value="default" disabled>Choose here</option>
                <option >User</option>
                <option >Professional</option>
            </Select>
        </FormDiv>
        <FormDiv> 
            <Button type="submit" bg ='#4F646F' color='#F4FAFF'>
                {isLoading ? "Loading..." : "Login"}
            </Button>
        </FormDiv>
        <FormDiv> 
            {errors.map(error => (
                <Error key={error}>{error}</Error>
            ))} 
        </FormDiv>
    </form>
  )
}

export default Login

const Select = styled.select`
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #f3f3f4;
    -webkit-appearance: auto;
    width: 102%;
    font-size: 1rem;
    line-height: 1.5;
    padding: 8px;
    background-color: #DEE7E7;
    font-family: 'Lato', sans-serif;
`