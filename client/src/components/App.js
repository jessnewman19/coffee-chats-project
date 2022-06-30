import React, {useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/me')
    .then(r => { 
      if (r.ok) { 
        r.json().then(user => setUser(user))
      }
    });
  }, [])

  if (!user) return <Home onLogin={setUser} />

  return (
    <BrowserRouter>
    <NavBar setUser={setUser}/>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/">
            <h1>Hello there</h1>
          </Route> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
