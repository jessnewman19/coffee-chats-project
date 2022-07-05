import React, {useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null)
  const [industries, setIndustries] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedIndustryId, setSelectedIndustryId] = useState("")

  useEffect(() => {
    fetch('/me')
    .then(r => { 
      if (r.ok) { 
        r.json().then(user => setUser(user))
      }
    });
  }, [])

  //Handle industries being populated on Signup, Dashboard, and Connections
  useEffect(() => {
      fetch('/industries')
      .then(r => { 
          r.json().then(industry => setIndustries(industry))
      })
  }, [])

  useEffect(() => { 
      if (selectedIndustry !== "") { 
          const filteredIndustry = industries.find(industry => { 
              return industry.industry === selectedIndustry
          })
          setSelectedIndustryId(filteredIndustry.id)
      }
  }, [selectedIndustry])

  //Handle whether to show signup or login page
  if (!user) return <Home onLogin={setUser} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries}/>

  return (
    <BrowserRouter>
    <NavBar setUser={setUser}/>
      <div className="App">
        <Switch>
          <Route path="/dashboard">
            <Dashboard setUser={setUser} currentUser={user} selectedIndustryId={selectedIndustryId} setSelectedIndustry={setSelectedIndustry} industries={industries}/>
          </Route>
          <Route path="/connections">
            <h1>Connections</h1>
          </Route> 
          <Route path="/about">
            <h1>About</h1>
          </Route> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
