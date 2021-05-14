import {
    createReducer,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";

  const  parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };

  export const registerRequest = createAsyncThunk("REGISTER_REQUEST", (input) => {
    return axios
      .post("http://localhost:5000/api/register", input)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  });
  export const loginRequest = createAsyncThunk("LOGIN_REQUEST", (input) => {
    return axios
      .post("http://localhost:5000/api/login", input)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const data = parseJwt(res.data.token);
        return data;
      })
      .catch((err) => console.log(err));
  });

  export const sendToken = createAsyncThunk("LOGIN_REQUEST", (token) => {
      return axios
      .post("http://localhost:5000/api/me",{}, {headers: { Authorization: `Bearer ${token}`}} )
      .then((res)=> res.data) 
      .catch((err) => console.log(err))
    });
    export const logoutRequest = createAsyncThunk("LOGOUT_REQUEST", (user,thunkAPI) => {
      localStorage.removeItem('token')
      return {}
  });
  export const removeFavorite = createAsyncThunk("REMOVE_FAVORITES", (data) => {
    return axios
      .post("http://localhost:5000/api/removeFavorite", data)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  });

  const initialState = {
    user: [],
    favorites:[],
   
  };
  export const userReducer = createReducer(initialState, {
    [loginRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        user: action.payload,
        favorites:action.payload.favorites
      }
    },
    [sendToken.fulfilled]: (state, action) =>{
      return {
        ...state,
        user: action.payload,
        favorites:action.payload.favorites
      }
    },
    [removeFavorite.fulfilled]: (state, action) =>{     
      return {
        ...state,
        favorites:action.payload.favorites
      }
    },
    [logoutRequest.fulfilled]: (state, action) => action.payload,

  });
