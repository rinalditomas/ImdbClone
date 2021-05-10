import react from 'react'
import loginImg from '../../login.svg'
import "./style.scss"

function Register({handleChange,input,handleSubmit}) {

   
    return (
      <div className="base-container">
      <div className="header"> Register</div>
      <div className = "content">
            <div className ="image">
                <img src={loginImg} alt=""/>

            </div>
            <div className="form">
               <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input 
                   type="text" 
                   name="email" 
                   placeholder="Email"
                   onChange={handleChange}
                     value= {input.email}
                   />
                  
               </div>
               <div className="form-group">
                   <label htmlFor="username">Username</label>
                   <input 
                   type="text" 
                   name="username" 
                   placeholder="Username"
                   onChange={handleChange}
                     value= {input.username}
                   />
                  
               </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input 
                   type="password" 
                   name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value= {input.password}
                    />
                 
               </div>

            </div>

      </div>
      <div className="footer">
          <button type ="button" className="btn" onClick={handleSubmit}>Register</button>
      </div>
      </div>
    );
  }
  
  export default Register;