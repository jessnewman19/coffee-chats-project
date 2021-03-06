import React, {useEffect, useState} from 'react'; 
import {Image} from '../styles/Image';
import Button from '../styles/Button';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';

function Dashboard({setUser, user, selectedIndustryId, setSelectedIndustry, industries, meetings, setMeetings}) {
    const [bio, setBio] = useState(user.bio)
    const [industry, setIndustry] = useState(user.industry.industry)
    const [username, setUsername] = useState(user.username)
    const [userMeetings, setUserMeetings] = useState([])

      //Sets new industry ID when selected industry is changed on user dashboard
      useEffect(() => { 
        setSelectedIndustry(industry)
    }, [industry])

      const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
        event.target.blur();
        }
      }

      //Grab selected meetings when meetings is added to on the connections page
      useEffect(() => {
            if (meetings !== []) { 
                const selectedMeetings = meetings.filter(meeting => { 
                    return meeting.user.id === user.id
                })
                setUserMeetings(selectedMeetings)
            }
        }, [meetings])

      function handleSubmit(e) { 
        e.preventDefault()
        fetch(`/users/${user.id}`, { 
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ 
                bio, 
                username, 
                industry_id: parseInt(selectedIndustryId),
            }),
        }).then((r) => { 
            if (r.ok) { 
                r.json().then(user => setUser(user))
                alert("Changes have been made!")
            } else { 
                r.json().then(err => console.log(err.errors))
            }
        })
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <Header>{`Welcome, ${user.full_name}!`}</Header>
            </div>
            <Wrapper>
                <Image src={user.image} alt="Profile photo" />
                <H2>Bio:</H2>
                <EditTextArea
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    onKeyDown={handleKeyDown}
                ></EditTextArea>
            </Wrapper>
            <Wrapper>
                <H2>Username: </H2>
                <EditInput
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                ></EditInput>
            </Wrapper>
        <Wrapper>
            <H2>Selected industry: </H2>
                <EditSelect
                        name="industry"
                        id="industry"
                        defaultValue={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        onKeyDown={handleKeyDown}
                >
                    <option value={industry} >{user.industry.industry}</option>
                    {industries.map(industry => { 
                        return <option key={industry.id} value={industry.industry}>{industry.industry}</option>
                    })}
                </EditSelect>
            </Wrapper>
            <Wrapper>
                <Button bg ='#4F646F' color='#F4FAFF' type="submit">Submit Changes</Button>
            </Wrapper>
            </form>
            {userMeetings.map(userMeeting => { 
                return <MeetingCard userMeeting={userMeeting} key={userMeeting.id} setMeetings={setMeetings}/>
            })}
        </div>
  )
}

export default Dashboard

const Header = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 3rem;
    color: #B7ADCF;
    margin: 20px;
`

const Wrapper = styled.section`
  max-width: 800px;
  margin: 20px auto;
  padding: 16px;
  display: flex;
`;

const H2 = styled.h2`
    font-family: 'Lato', sans-serif;
    margin-left: 30px;
    padding-top: 15px;
    display: flex;
    color: #4F646F;
`

const EditTextArea = styled.textarea`
    font-family: 'Lato', sans-serif;
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
    padding-left: 10px;
    background-color: #DEE7E7;
    `
const EditInput = styled.input`
    font-family: 'Lato', sans-serif;
    border: 1px solid rgba(50, 115, 220, 0.2);
    border-radius: 12px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 100;
    font-size: 1.2rem;
    margin-top: 30px;
    margin-left: 10px;
    padding-left: 10px; 
    background-color: #DEE7E7;
`

const EditSelect = styled.select`
    font-family: 'Lato', sans-serif;
    border: 1px solid rgba(50, 115, 220, 0.2);
    border-radius: 12px;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 100;
    font-size: 1.2rem;
    margin-top: 30px;
    margin-left: 10px;
    padding-left: 10px; 
    background-color: #DEE7E7;
`