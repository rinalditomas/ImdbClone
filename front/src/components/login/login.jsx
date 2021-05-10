import react from 'react'
import loginImg from '../../login.svg'
import "./style.scss"

function Login({handleChange,input, handleSubmit}) {

   
    return (
      <div className="base-container">
      <div className="header"> Login</div>
      <div className = "content">
            <div className ="image">
                <img src={loginImg} alt="loginImg"/>

            </div>
            <div className="form">
               <div className="form-group">
                   <label htmlFor="username">Username</label>
                   <input 
                   type="text"
                    name="username"
                     placeholder="username"
                     onChange={handleChange}
                     value= {input.username}
                     />
                  
               </div>
               <div className="form-group">
                   <label htmlFor="username">Password</label>
                   <input 
                   type="password" 
                   name="password"
                    placeholder="password"
                    onChange={handleChange}
                    value= {input.password}
                    />
                 
               </div>

            </div>

      </div>
      <div className="footer">
          <button type ="button" className="btn" onClick ={handleSubmit}>Login</button>
      </div>
      </div>
    );
  }
  
  export default Login;