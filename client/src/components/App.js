import React, {useState, useEffect, useContext} from "react";
import {UserContext, UserProvider} from "../context/UserProvider";
import GlobalStyles from "../styles/Global";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Connections from "./Connections";
import Pending from "./Pending";

function App() {
  const [user, setUser] = useState(UserContext)
  const [meetings, setMeetings] = useState([])
  const [industries, setIndustries] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedIndustryId, setSelectedIndustryId] = useState("")
  const [isUser, setIsUser] = useState("User")

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      } else {
        console.log('fetch failed')
      }
    })
  }, [])

  useEffect(() => {
    fetch('/professional/me')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      } else {
        console.log('fetch failed')
      }
    })
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

  // useEffect(() => { 
  //   fetch('/meetings')
  //     .then(r => { 
  //       r.json().then(meeting => setMeetings(meeting))
  //     })
  // }, [setMeetings])

  //Handle whether to show signup or login page
  if (user === UserContext) return <Home onLogin={setUser} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} isUser={isUser} setIsUser={setIsUser}/>

  return (
    <div className="App">
    <GlobalStyles />
    <NavBar setUser={setUser} isUser={isUser}/>
        <Switch>
          <Route path="/dashboard">
            <Dashboard setUser={setUser} user={user} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} meetings={meetings} setMeetings={setMeetings}/>
          </Route>
          <Route path="/connections"> 
            <Connections user={user} setMeetings={setMeetings} meetings={meetings} isUser={isUser}/>
          </Route>
          <Route path="/pending">
            <Pending />
          </Route>
          <Route path="/about">
            <h1>About</h1>
          </Route> 
        </Switch>
      </div>
  );
}

export default App;
