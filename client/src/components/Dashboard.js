import React, {useState} from 'react'; 
import {Image} from '../styles/Image';
import Button from '../styles/Button';
import styled from 'styled-components';
import Error from '../styles/Error';

function Dashboard({setUser, currentUser, selectedIndustryId, setSelectedIndustry, industries}) {
    const [bio, setBio] = useState(currentUser.bio)
    const [username, setUsername] = useState(currentUser.username)
    const [industry, setIndustry] =useState(currentUser.industry.id)
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    console.log(bio)

    function handleBioChange(e) { 
        const {name, value} = e.target
        console.log(e.target)
        setBio(prevBio => console.log(prevBio))
        // setBio((prevBio => ({...prevBio, [name]: value})))
      }

      function handleUsernameChange(e) { 
        const {name, value} = e.target
        console.log(name, value)
        setUsername((prevUsername => ({...prevUsername, [name]: value})))
      }

      function handleIndustryChange(e) { 
        setSelectedIndustry(e.target.value)
        setIndustry(selectedIndustryId)
      }

      const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
        event.target.blur();
        }
      }

      function handleUpdatedForm(e) { 
        e.preventDefault()
        setErrors([])
        setIsLoading(true)
        const formData = new FormData()
            formData.append('username', username)
            formData.append('industry_id', parseInt(selectedIndustryId))
            formData.append('bio', bio)
        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            body: formData
        }).then(r => { 
            if (r.ok) { 
                r.json().then(user => setUser(user))
            } else { 
                r.json().then(error => console.log(error.errors))
            }
        })
      }

  return (
    <form onSubmit={(e) => handleUpdatedForm(e)}>
        <div>
            <Header>{`Welcome, ${currentUser.full_name}!`}</Header>
        </div>
        <Wrapper>
            <Image src={currentUser.image} alt="Profile photo" />
            <H2>Bio:</H2>
            <EditTextArea
                type="text"
                name="bio"
                value={bio}
                onChange={(e) => handleBioChange(e)}
                onKeyDown={handleKeyDown}
            ></EditTextArea>
        </Wrapper>
        <Wrapper>
            <H2>Username: </H2>
            <EditInput
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => handleUsernameChange(e)}
                    onKeyDown={handleKeyDown}
            ></EditInput>
        </Wrapper>
       <Wrapper>
        <H2>Selected industry: </H2>
            <EditSelect
                    name="industries"
                    id="industries"
                    defaultValue={currentUser.industry.industry}
                    onChange={(e) => handleIndustryChange(e)}
                    onKeyDown={handleKeyDown}
            >
                <option value={industry} disabled>{currentUser.industry.industry}</option>
                {industries.map(industry => { 
                    return <option key={industry.id} value={industry.industry}>{industry.industry}</option>
                })}
            </EditSelect>
        </Wrapper>
        <Wrapper>
            <Button bg ='#000080' color='#fff' type="submit">{isLoading ? "Loading..." : "Submit Changes"}</Button>
        </Wrapper>
        <div>
            {errors.map(error => (
                <Error key={error}>{error}</Error>
            ))} 
        </div>
        </form>
  )
}

export default Dashboard

const Header = styled.h1`
    font-size: 3rem;
    color: #ADD8E6;
    margin: 20px;
`

const Wrapper = styled.section`
  max-width: 800px;
  margin: 20px auto;
  padding: 16px;
  display: flex;
`;

const H2 = styled.h2`
    margin-left: 30px;
    padding-top: 15px;
    display: flex;
`

const EditTextArea = styled.textarea`
    rows={1};
    border: 1px solid rgba(50, 115, 220, 0.2);
    border-radius: 12px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 100;
    font-size: 1rem;
    margin-top: 30px;
    margin-left: 40px;
    padding-top: 10px;
    padding-left: 10px
    `
const EditInput = styled.input`
    border: 1px solid rgba(50, 115, 220, 0.2);
    border-radius: 12px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 100;
    font-size: 1.2rem;
    margin-top: 30px;
    margin-left: 10px;
    padding-left: 10px
`

const EditSelect = styled.select`
    border: 1px solid rgba(50, 115, 220, 0.2);
    border-radius: 12px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 100;
    font-size: 1.2rem;
    margin-top: 30px;
    margin-left: 10px;
    padding-left: 10px
`