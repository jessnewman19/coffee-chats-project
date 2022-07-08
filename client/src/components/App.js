import React, {useState, useEffect} from "react";
import {ThemeProvider} from 'styled-components';
import GlobalStyles from "../styles/Global";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Connections from "./Connections";

function App() {
  const [user, setUser] = useState(null)
  const [meetings, setMeetings] = useState([])
  const [industries, setIndustries] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedIndustryId, setSelectedIndustryId] = useState("")

  //Upon every rerender/refresh the user stays put
  useEffect(() => {
    fetch('/me')
    .then(r => { 
      if (r.ok) { 
        r.json().then(user => setUser(user))
      }
    });
  }, [])

  //Handle industries being populated on Signup, Dashboard, and Connections
  //Dependency array on first render
  useEffect(() => {
      fetch('/industries')
      .then(r => { 
          r.json().then(industry => setIndustries(industry))
      })
  }, [])

  //Run whenever selectedIndustry is populated
  //Do I need the useEffect here?
  useEffect(() => { 
      if (selectedIndustry !== "") { 
          const filteredIndustry = industries.find(industry => { 
              return industry.industry === selectedIndustry
          })
          setSelectedIndustryId(filteredIndustry.id)
      }
  }, [selectedIndustry])

  useEffect(() => { 
    fetch('/meetings')
      .then(r => { 
        r.json().then(meeting => setMeetings(meeting))
      })
  }, [setMeetings])

  //Handle whether to show signup or login page
  if (!user) return <Home onLogin={setUser} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries}/>

  return (
    <div className="App">
    <GlobalStyles />
    <NavBar setUser={setUser}/>
        <Switch>
          <Route path="/dashboard">
            <Dashboard setUser={setUser} user={user} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} meetings={meetings} setMeetings={setMeetings}/>
          </Route>
          <Route path="/connections">
            <Connections user={user} setMeetings={setMeetings} meetings={meetings}/>
          </Route> 
          <Route path="/about">
            <h1>About</h1>
          </Route> 
        </Switch>
      </div>
  );
}

export default App;
