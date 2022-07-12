import React from 'react'; 
import { AboutCard } from '../styles/AboutCard';

function About({ item: { id, title, body, image } }) {
  return (
    <AboutCard layout={id % 2 === 0 && 'row-reverse'}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <div>
        <img src={`${image}`} alt='' />
      </div>
    </AboutCard>
  )
}

export default About

