import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.scss';
import {logoutRequest} from '../state/user'
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { getMovies } from "../state/movies";


const Navbar = () => {
    const [toogle,setToogle] = useState(true)
    const [searchValue,setSearchValue]= useState("")
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const history = useHistory();

    useEffect(() => {
      dispatch(getMovies("iron man"))
  }, [])


  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setSearchValue({ ...searchValue, [key]: value });
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(getMovies(searchValue.search))
    

  }

  const logout= ()=>{
    localStorage.removeItem("token");
    dispatch(logoutRequest())
    alert("See you!")   
     history.push("/");


  }
    return(
        <nav>
            <div className="hamburger" onClick={()=>toogle? setToogle(false):setToogle(true)} >
               <div className="line"></div>
               <div className="line"></div>
               <div className="line"></div>
            </div>
            <div className="search-b">
              <form onSubmit={handleSubmit}>
                <input
                 type="text" 
                 className= "form-control" 
                 placeholder="Search movie"
                 name="search"
                 onChange={handleChange}
                 value={searchValue.search}
                 />
              </form>
            </div>
            <div className=" botones">
            <ul className={ toogle ? "nav-links close": "nav-links open"}>
            {token ? <>
                <li><Link to="/movies">Movies</Link></li>
                 <li><Link onClick={logout}>Logout</Link></li>
                 <li><Link to="/favorites">Favorites</Link></li>
                </>
                 : <>
                  <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/user/login">Login</Link></li>
                <li><Link to="/user/register">Register</Link></li>
                
                 </>
                 }
                
            </ul>
            </div>
        </nav>
    )
};
export default Navbar;