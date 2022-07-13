import React from 'react'; 
import styled from 'styled-components';

function MeetingCard({userMeeting, setMeetings, meetings}) {
    const userStatus = localStorage.getItem('isUser')

    //Delete meeting from full array of meetings
    //Full functionality
    function handleDelete(userMeeting) { 
        fetch(`/meetings/${userMeeting.id}`, { 
            method: "DELETE",
        }).then(() => { 
            setMeetings((meetings) => 
                meetings.filter(meeting => meeting.id !== userMeeting.id))
        })
    }

    //Change persists on the back end!
    function handleApprove(userMeeting) {
        fetch(`/meetings/${userMeeting.id}`, {
            method: "PATCH", 
            headers: { 
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                is_approved: true,
            }), 
        }).then(r => { 
            if (r.ok) { 
                r.json().then(approvedMeeting => { 
                    //Returns ALL MEETINGS 
                    const newMeetings = meetings.filter(meeting => { 
                        return meeting.id !== approvedMeeting.id
                    })
                    setMeetings([...newMeetings, approvedMeeting])
                })
             } else { 
                r.json().then(err => console.log(err.errors))
            }
        })
    }

  return (
    <div>
        {userStatus === "User" ? 
        <>
            <Wrapper>
                <Section> 
                    <H3>{userMeeting.meeting_date} @ {userMeeting.meeting_time}</H3>
                        <div>Meeting with: {userMeeting.professional.full_name}</div>
                    {userMeeting.is_approved === false ? <div>Pending approval</div> : <div>Meeting has been confirmed!</div>}
                </Section>
                <Button onClick={() => handleDelete(userMeeting)} bg ='#4F646F' color='#F4FAFF'>Delete meeting</Button>
            </Wrapper> 
        </> : 
        <>
            <Wrapper>
                <Section> 
                    <H3>{userMeeting.meeting_date} @ {userMeeting.meeting_time}</H3>
                    <div>Meeting with: {userMeeting.user.full_name}</div>
                </Section>
                {userMeeting.is_approved === false ? <Button onClick={() => handleApprove(userMeeting)} bg ='#4F646F' color='#F4FAFF'>Approve meeting</Button> : null}
                <Button onClick={() => handleDelete(userMeeting)} bg ='#4F646F' color='#F4FAFF'>{userMeeting.is_approved === false ? "Deny meeting" : "Delete meeting"}</Button>
            </Wrapper>
        </> 
        }
    </div>
  )
}

export default MeetingCard; 

const Wrapper = styled.section`
    width: 60%;
    margin: 40px auto;
    padding: 30px;
    display: flex;
    border-radius: 15px;
    background-color: #F4FAFF;
    border: 1px solid rgba(183,173,207, 0.2);
    box-shadow: 12px 12px 2px 1px rgba(183,173,207, .9);
`

const Section = styled.section`
    font-family: 'Lato', sans-serif;
    padding-left: 18px;
    width: 65%;
`

const H3 = styled.h3`
    font-family: 'Lato', sans-serif;
    text-size: 10px;
    display: flex;
    height: 30px;
`

const Button = styled.button`
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 40px;
    background-color: ${({bg}) => bg || '#fff'};
    color: ${({color}) => color || '#333'};

    &:hover{ 
        opacity: 0.8; 
        transform: scale(0.98);
    }
`