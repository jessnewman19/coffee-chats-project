import React from 'react'; 
import styled from 'styled-components';
import Button from '../styles/Button';

function MeetingCard({userMeeting, setMeetings}) {

    function handleDelete(userMeeting) { 
        console.log(userMeeting)
        fetch(`/meetings/${userMeeting.id}`, { 
            method: "DELETE",
        }).then((r) => { 
            setMeetings((meetings) => 
                meetings.filter(meeting => meeting.id !== userMeeting.id))
        })
    }
  return (
    <div>
        <H3>View your scheduled meetings below!</H3>
        <Wrapper>
            <Section> 
                <H3>{userMeeting.meeting_date} @ {userMeeting.meeting_time}</H3>
                <div>Meeting with: {userMeeting.professional.full_name}</div>
            </Section>
            <Button onClick={() => handleDelete(userMeeting)} bg ='#4F646F' color='#F4FAFF'>Delete meeting</Button>
        </Wrapper>
    </div>
  )
}

export default MeetingCard; 

const Wrapper = styled.section`
max-width: 1000px;
margin: 25px auto;
padding: 16px;
display: flex;
border-radius: 15px;
border: 1px solid rgba(183,173,207, 0.2);
box-shadow: 12px 12px 2px 1px rgba(183,173,207, .9);
`

const Section = styled.section`
font-family: 'Lato', sans-serif;
padding-left: 18px;
width: 40%;
`

const Image = styled.img`
max-width: 10rem; 
max-height: 10rem;
border-radius: 50%;
object-fit: fill;
`

const Logo = styled.div`
color: #0A66C2;
padding-top: 10px;
justify-content: flex-start;
display: flex;
align-items: center;
text-decoration: none;
font-size: 1.5rem;
font-weight: 800;
`

const H3 = styled.h3`
font-family: 'Lato', sans-serif;
text-size: 10px;
display: flex;
height: 30px;
`