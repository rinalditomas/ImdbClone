import React, { useState } from "react";
import '../../App.scss';
import Login from './login'
import Register from './register'
import {registerRequest,loginRequest} from '../../state/user'
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";



function UserContainer({match}) {
  const [input, setInput] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(match.login === "register"){
    try {
      const newUser = await dispatch(registerRequest(input));
      setInput([])
      alert("Usuario creado correctamente")
      history.push("/user/login");
    


    } catch (error) {
      console.log(error)
      alert("hubo un problema")
    }
  }
  if(match.login === "login"){
    try {
      const loggedUser = await dispatch(loginRequest(input))
      alert(`Bienvenido ${loggedUser.payload.username}`)
      history.push("/");
      
    } catch (error) {
      console.log(error)
    }
  }
   
  }
  

  return (
    <div className="App">
      <div className="login">
        <div className="container">
          {match.login === "login"? <Login handleChange={handleChange} input={input} handleSubmit={handleSubmit}/> : match.login ==="register" ? <Register handleChange={handleChange} input={input} handleSubmit={handleSubmit} /> : null}
          
        </div>
      </div> 
    </div>
  );
}

export default UserContainer;