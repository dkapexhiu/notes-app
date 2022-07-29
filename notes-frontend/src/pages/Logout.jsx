import React, {useEffect} from 'react';

function Logout() {

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    window.location.href='/login'
  }

  useEffect(() => {
    setTimeout(function(){ 
      var roleDB = localStorage.getItem('role');
      console.log(roleDB);
      if(roleDB === null){
        window.location.href='/login'
      }
    }, 1000);
  }, []);

  return (
      <div className="App">
      <nav>
      <ul>
          <li><button onClick={logout}>Logout</button></li>
          <li>You will be redirected to login</li>
      </ul>
      </nav>
      </div>
  );
}

export default Logout;