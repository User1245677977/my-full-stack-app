import React, { createContext, useState } from 'react';

// Create UserContext with default values
export const UserContext = createContext({
  users: [{ name: "Default User", balance: 1000 }],
  currentUser: null,
  setCurrentUser: () => {},
  addSubmission: () => {},
});

// UserProvider component to manage and provide context values
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([{ name: "Default User", balance: 1000 }]);
  const [currentUser, setCurrentUser] = useState(null);

  const addSubmission = (user) => {
    setUsers([...users, user]);
    setCurrentUser(user); // Set the newly added user as the current user
    console.log('New current user set:', user);
  };

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser, addSubmission }}>
      {children}
    </UserContext.Provider>
  );
};

// Card component for displaying information
export function Card(props) {
  function classes() {
    const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? 'text-' + props.txtcolor : 'text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>
  );
}
