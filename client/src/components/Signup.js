import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components';
import FormDiv from '../styles/FormDiv';
import Label from '../styles/Label';
import Input from '../styles/Input';
import Button from '../styles/Button';
import Error from '../styles/Error';

function Signup({onLogin}) {
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [bio, setBio] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    //Industry drop down
    const [industries, setIndustries] = useState([])
    const [selectedIndustry, setSelectedIndustry] = useState("")
    const [selectedIndustryId, setSelectedIndustryId] = useState("")

    useEffect(() => {
        fetch('/industries')
        .then(r => { 
            r.json().then(industry => setIndustries(industry))
        })
    }, [])

    useEffect(() => { 
        if (selectedIndustry !== "") { 
            const filteredIndustry = industries.find(industry => { 
                return industry.industry === selectedIndustry
            })
            setSelectedIndustryId(filteredIndustry.id)
        }
    }, [selectedIndustry])

    function handleSignup(e) { 
        e.preventDefault()
        setErrors([])
        setIsLoading(true)
        fetch('/signup', { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                full_name: fullName, 
                username, 
                password,
                password_confirmation: passwordConfirmation, 
                industry_id: parseInt(selectedIndustryId), 
                bio,
            }),
        }).then(r => { 
            setIsLoading(false)
            if (r.ok) { 
                r.json().then(user => onLogin(user))
            } else { 
                r.json().then(error => setErrors(error.errors))
            }
        })
    }

  return (
    <form onSubmit={handleSignup}>
        <FormDiv> 
            <Label>Full name: </Label>
            <Input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e => setFullName(e.target.value))}
            />
        </FormDiv>
        <FormDiv> 
            <Label>Username: </Label>
            <Input
                type="text"
                id="username"
                value={username}
                onChange={(e => setUsername(e.target.value))}
            />
        </FormDiv>
        <FormDiv> 
            <Label>Password: </Label>
            <Input
                type="password"
                id="password"
                value={password}
                onChange={(e => setPassword(e.target.value))}
            />
        </FormDiv>
        <FormDiv> 
            <Label>Confirm your password: </Label>
            <Input
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e => setPasswordConfirmation(e.target.value))}
            />
        </FormDiv>
        <FormDiv> 
            <Label>Industry of interest: </Label>
            <Select name="industries" id="industries" defaultValue="default" onChange={(e) => setSelectedIndustry(e.target.value)}>
                <option value="default" disabled>Choose here</option>
                {industries.map(industry => { 
                    return <option key={industry.id} value={industry.industry}>{industry.industry}</option>
                })}
            </Select>
        </FormDiv>
        <FormDiv> 
            <Label>Bio: </Label>
            <TextArea
                type="text"
                id="bio"
                value={bio}
                onChange={(e => setBio(e.target.value))}
            ></TextArea>
        </FormDiv>
        <FormDiv> 
            <Button bg ='#000080' color='#fff' type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
        </FormDiv>
        <FormDiv>
            {errors.map(error => (
                <Error key={error}>{error}</Error>
            ))} 
        </FormDiv>
    </form>
  )
}

const Select = styled.select`
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #f3f3f4;
    -webkit-appearance: auto;
    width: 102%;
    font-size: 1rem;
    line-height: 1.5;
    padding: 8px;
`

const TextArea = styled.textarea`
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #f3f3f4;
    -webkit-appearance: auto;
    max-width: 100%;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5;
    padding: 4px;
`

export default Signup