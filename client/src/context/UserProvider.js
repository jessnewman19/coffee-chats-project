import React, {useState, createContext} from "react";

const UserContext = createContext();

const userObject = {}

function UserProvider( {children} ) {
    const [currentUser, setCurrentUser] = useState(userObject)

    return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
      </UserContext.Provider>
    )
  }

export { UserContext, UserProvider }