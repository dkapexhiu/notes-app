import React, { useEffect, useState } from 'react';
import {
  NavLink
} from 'react-router-dom';

function Home() {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'))
    setEmail(localStorage.getItem('email'))
    setTimeout(function(){ 
      var roleDB = localStorage.getItem('role');
      if(roleDB === null){
        window.location.href='/login'
      }
    }, 1000);
  }, []);

  return (
      <div className="App">
      <nav>
      <ul>
        {role != null && <li>
          <NavLink
            to="/"
          >
            Home
          </NavLink>
        </li>}  
        {role != null && <li>
          <a href={'/users/'+email}>Your User</a>
        </li>}
        {role != null && <li>
          <a href={'/notes/'+email}>Your Notes</a>
        </li>}
        {role === "admin" && role != null && <li>
          <NavLink
            to="/notes"
          >
            All notes
          </NavLink>
        </li>}
        {role === "admin" && role != null && <li>
          <NavLink
            to="/users"
          >
            All Users
          </NavLink>
        </li>}
        {role != null && <li>
          <NavLink
            to={"/logout"}
          >
            Logout
          </NavLink>
        </li>}
        {role == null && 
        <div>
          <li>The session has expired</li>
          <li><NavLink
            to="/login"
          >
            Login
          </NavLink></li>
        </div>
        
        }
      </ul>
      </nav>
      </div>
  );
}

export default Home;