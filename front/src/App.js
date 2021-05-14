import React from 'react'

import { useDispatch } from 'react-redux';
import {sendToken} from "../src/state/user"
import './App.scss';
import UserContainer from './components/login/userContainer'
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar"
import Landing from "./components/movies/landing"
import Favorites from './components/movies/favorites';
import SingleMovie from './components/movies/singleMovie'



function App() {

  const dispatch = useDispatch()
  const token =localStorage.getItem("token")

  React.useEffect(() => {
    if(token){
      dispatch(sendToken(token))
    }
  }, []);

  return (
    <div>
     <Navbar />
     <Switch>
     <Route exact path="/user/:login" render={({match})=><UserContainer match={match.params}/>} />
     <Route exact path="/movie/:id" render={({match})=><SingleMovie match={match.params}/>} />
     <Route exact path="/favorites" component={Favorites} />
     <Route path="/" component={Landing} />

     </Switch>
     </div>

  );
}

export default App;
