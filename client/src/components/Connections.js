import React, {useState, useEffect} from 'react'
import ConnectionsCard from './ConnectionsCard'
import styled from 'styled-components'

function Connections({user, setMeetings, meetings}) {
    const [professionals, setProfessionals] = useState([])
    const [selectedProfessionals, setSelectedProfessionals] = useState([])

    useEffect(() => { 
        fetch('/professionals')
        .then(r => { 
            r.json().then(professional => setProfessionals(professional))
        })
    }, [])

    useEffect(() => { 
        const filteredProfessionals = professionals.filter(professional => { 
            return professional.industry.industry === user.industry.industry
        })
        setSelectedProfessionals(filteredProfessionals)
    }, [user, professionals])


  return (
    <div>
        <H1>{`Selected industry: ${user.industry.industry}`}</H1>
        {selectedProfessionals.map(professional => <ConnectionsCard key={professional.id} professional={professional} setMeetings={setMeetings} meetings={meetings}/>)}
    </div>
  )
}

export default Connections

const H1 = styled.h1`
    max-width: 800px;
    margin: 20px auto;
    padding: 16px;
    display: flex;
`