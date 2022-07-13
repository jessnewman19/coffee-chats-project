import React, {useState} from 'react'; 
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// import Calendar from 'react-calendar'; 
// import 'react-calendar/dist/Calendar.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
    typography: {
      fontSize: 12,
      fontFamily: 'Lato, sans-serif',
    },
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

function ConnectionsCard({professional, setMeetings, meetings}) {
    const [meeting, setMeeting] = useState(new Date('2022-07-12T21:00:00'))
    const [meetingDate, setMeetingDate] = useState("")
    const [meetingTime, setMeetingTime] = useState("")
    const history = useHistory()

    const handleChange = (newValue) => {
        setMeeting(newValue)
        setMeetingDate(newValue.toDateString())
        setMeetingTime(newValue.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
      }

      //Submit meeting request
    const handleSubmit = (e) => { 
        e.preventDefault()
        fetch('/meetings', { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                meeting_date: meetingDate, 
                meeting_time: meetingTime, 
                is_approved: false,
                professional_id: professional.id})
        }).then((r) => { 
            if (r.ok) { 
                r.json().then(meeting => setMeetings([...meetings, meeting]))
            } else { 
                r.json().then(err => console.log(err.errors))
            }
        })
        history.push("/dashboard")
    }

  return (
    <Wrapper>
        <Image src={professional.image} alt="Profile photo" />
        <Section> 
            <H3>{professional.full_name}</H3>
            <div>{professional.bio}</div>
        </Section>
        <Form onSubmit={handleSubmit}> 
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack >
                    <DateTimePicker
                        label="Date&Time picker"
                        value={meeting}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </Stack>
                </LocalizationProvider>
                <Button type="submit" bg ='#4F646F' color='#F4FAFF'>Submit</Button>
            </ThemeProvider>
        </Form>
    </Wrapper>
  )
}

export default ConnectionsCard

const Wrapper = styled.section`
    width: 50%;
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
    padding-bottom: 15px;
`

const Form = styled.form`
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 0px 10px 0px 20px;
`

const Button = styled.button`
    font-family: 'Lato', sans-serif;
    border-radius: 100px;
    display: flex;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 40px;
    margin-top: 10px;
    background-color: ${({bg}) => bg || '#fff'};
    color: ${({color}) => color || '#333'};

    &:hover{ 
        opacity: 0.8; 
        transform: scale(0.98);
    }
`