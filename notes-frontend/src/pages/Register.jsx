import React, {useState, setState} from 'react';
import './style.css'
import axios from 'axios';

function RegistrationForm() {
      
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
      
    }
    
    const handleSubmit  = () => {
        if(firstName == null || lastName == null || email == null || password == null || confirmPassword == null){
            alert("Please compile all the data");
        }else if(password != confirmPassword){
            alert("Password and confirm password should be the same");
        }

        const newItems = {
            //id: users.length + 1,
            first_name: firstName,
            last_name: lastName,
            email: email, 
            password: password,
            role: 'normal'
          };

        var config = {
            method: 'post',
            url: 'http://localhost:3001/register',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : newItems
          };
          
          axios(config)
          .then(function (response) {
            alert("Successfully Registered! Please login")
            window.location.href = '/login';
          })
          .catch(function (error) {
            if(error.response.status === 409){
                alert("Email already registered");
            }
          });
    }
    
    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" htmlFor="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
            <a href="/login">Login</a>
        </div>
             
    )       
}

export default RegistrationForm