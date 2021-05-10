import React, { useState } from "react";
import '../../App.scss';
import Login from './login'
import Register from './register'
import {registerRequest,loginRequest} from '../../state/user'
import { useDispatch} from "react-redux";


function UserContainer() {
  const [isLogin,setIsLogin] = useState(false)
  const [input, setInput] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isLogin)
    if(isLogin === false){
      
    try {
      const newUser = await dispatch(registerRequest(input));
      setIsLogin(true)
      setInput([])

    } catch (error) {
      console.log(error)

    }
  }else{
    console.log(input)
    try {
      const loggedUser = await dispatch(loginRequest(input))
      console.log(loggedUser)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  }

  return (
    <div className="App">
      <div className="login">
        <div className="container">
          {isLogin && <Login handleChange={handleChange} input={input} handleSubmit={handleSubmit}/>}
          {!isLogin && <Register handleChange={handleChange} input={input} handleSubmit={handleSubmit} />}
        </div>
        <button onClick={()=>{isLogin? setIsLogin(false):setIsLogin(true)}}>{isLogin?"registrarse":"login"}</button>
      </div> 
    </div>
  );
}

export default UserContainer;