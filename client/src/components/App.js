import React, {useState, useEffect, useContext} from "react";
import GlobalStyles from "../styles/Global";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Connections from "./Connections";
import content from '../AboutContent';
import About from "./About";

function App() {
  const [user, setUser] = useState(null)
  const [isUser, setIsUser] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [industries, setIndustries] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedIndustryId, setSelectedIndustryId] = useState("")
  const [meetings, setMeetings] = useState([])

  console.log(isUser)
  console.log(meetings)

  useEffect(() => {
    if (isUser === "User") { 
      fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      } else {
        console.log('fetch failed')
      }
    })
    } else if (isUser === "Professional") { 
      fetch('/professional/me')
      .then(res => {
        if (res.ok) {
          res.json().then(user => setUser(user))
        } else {
          console.log('fetch failed')
        }
      })
    }
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
  useEffect(() => { 
      if (selectedIndustry !== "") { 
          const filteredIndustry = industries.find(industry => { 
              return industry.industry === selectedIndustry
          })
          setSelectedIndustryId(filteredIndustry.id)
      }
  }, [selectedIndustry])

  //Sets meetings array upon first render
  useEffect(() => {
      fetch('/meetings')
      .then(r => { 
        r.json().then(meeting => setMeetings(meeting))
      })
  }, [])

  //Handle whether to show signup or login page
  if (user === null) return <Home onLogin={setUser} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} isUser={isUser} setIsUser={setIsUser}/>

  return (
    <div className="App">
    <GlobalStyles />
    <NavBar setUser={setUser} isUser={isUser}/>
        <Switch>
          <Route path="/dashboard">
            <Dashboard setUser={setUser} user={user} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries} meetings={meetings} setMeetings={setMeetings} isUser={isUser} setIsApproved={setIsApproved} isApproved={isApproved}/>
          </Route>
          <Route path="/connections"> 
            <Connections user={user} setMeetings={setMeetings} meetings={meetings} isUser={isUser} isApproved={isApproved} setIsApproved={setIsApproved}/>
          </Route>
          <Route path="/about">
            {content.map((item, index) => (
              <About key={index} item={item} />
            ))}
          </Route> 
        </Switch>
      </div>
  );
}

export default App;
