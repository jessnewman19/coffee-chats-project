import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

//styled components 
import FormDiv from '../styles/FormDiv';
import Label from '../styles/Label';
import Input from '../styles/Input';
import Button from '../styles/Button';
import Error from '../styles/Error';

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()

 function handleSubmit(e) { 
        e.preventDefault()
        setIsLoading(true)
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
            <Button type="submit" bg ='#000080' color='#fff'>
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