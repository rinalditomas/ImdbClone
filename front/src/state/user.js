import {
    createReducer,
    createAction,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";

  export const registerRequest = createAsyncThunk("REGISTER_REQUEST", (input) => {
    return axios
      .post("http://localhost:5000/api/register", input)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  });
  export const loginRequest = createAsyncThunk("LOGIN_REQUEST", (input) => {
      console.log("aca esta el input que esta llegando a redux", input)
    return axios
      .post("http://localhost:5000/api/login", input)
      .then((res) => {
          console.log("aca esta la respuesta de loginRequest en REDUX",res)
        // localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => console.log(err));
  });


  export const userReducer = createReducer({}, {
    [registerRequest.fulfilled]: (state, action) => action.payload,
    [loginRequest.fulfilled]: (state, action) => action.payload,
    // [sendToken.fulfilled]: (state, action) => action.payload,
    
  });
