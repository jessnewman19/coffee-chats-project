import React, {useState} from 'react'; 
import {useHistory} from "react-router-dom"
import styled from 'styled-components';
import FormDiv from '../styles/FormDiv';
import Label from '../styles/Label';
import Input from '../styles/Input';
import Button from '../styles/Button';
import Error from '../styles/Error';

function Signup({onLogin, selectedIndustryId, setSelectedIndustry, industries}) {
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [image, setImage] = useState("")
    const [bio, setBio] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    function handleSignup(e) { 
        e.preventDefault()
        setErrors([])
        setIsLoading(true)
        const userStatus = localStorage.getItem('isUser')
        const formData = new FormData()
            formData.append('full_name', fullName)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('password_confirmation', passwordConfirmation)
            formData.append('industry_id', parseInt(selectedIndustryId))
            formData.append('image', image)
            formData.append('bio', bio)
        if (userStatus === "User") { 
            fetch('/user/signup', { 
                method: "POST", 
                body: formData
            }).then(r => { 
                setIsLoading(false)
                if (r.ok) { 
                    r.json().then(user => onLogin(user))
                } else { 
                    r.json().then(error => setErrors(error.errors))
                }
            })
        }
        else if (userStatus === "Professional") { 
            fetch('/professional/signup', { 
                method: "POST", 
                body: formData
            }).then(r => { 
                setIsLoading(false)
                if (r.ok) { 
                    r.json().then(user => onLogin(user))
                } else { 
                    r.json().then(error => setErrors(error.errors))
                }
            })
            .catch( error => console.log(error.message))
        }
        history.push("/dashboard")
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
            <Label>Signing up as user or professional?</Label>
            <Select name = "isUser" id="isUser" defaultValue="default" onChange={(e) => localStorage.setItem('isUser', e.target.value)}>
                <option value="default" disabled>Choose here</option>
                <option >User</option>
                <option >Professional</option>
            </Select>
        </FormDiv>
        <FormDiv>
            <Label>Upload profile photo: </Label>
            <Input
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                id="image"
                onChange={(e => setImage(e.target.files[0]))}
            >
            </Input>
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
            <Button bg ='#4F646F' color='#F4FAFF' type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
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
    background-color: #DEE7E7;
    font-family: 'Lato', sans-serif;
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
    background-color: #DEE7E7;
    font-family: 'Lato', sans-serif;
`

export default Signup