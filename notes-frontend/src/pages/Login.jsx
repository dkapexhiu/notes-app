import React, {useState} from 'react';
import './style.css';
import axios from 'axios';


function LoginForm() {
      
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
      
    }
    
    const handleSubmit  = () => {
        if(email == null || password == null){
            alert("Please compile data");
        }

        var data = JSON.stringify({
            "email": email,
            "password": password
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:3001/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('email', response.data.email);
                window.location.href = "/";  
          })
          .catch(function (error) {
            if(error.response.status === 401){
                alert("Invalid email");
            }else if(error.response.status === 403)
                alert("Invalid password");
          });
    }
    
    return(
        <div className="form">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="htmlFor__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Login</button>
            </div>
            <a href="/register">Register</a>
        </div>
             
    )       
}

export default LoginForm