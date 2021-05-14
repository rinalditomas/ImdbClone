import {
    createReducer,
    createAsyncThunk,
    
  } from "@reduxjs/toolkit";
  import axios from "axios";



  export const getMovies = createAsyncThunk("GET_MOVIES", (valor) => {
    return axios
      .get(`http://www.omdbapi.com/?s=${valor}&apikey=bff7b362`)
      .then((res) =>{
        // console.log("aca esta la respuesta del servidor",res.data)
         return res.data.Search})
      .catch((e) => console.log(e));
  });
  export const addFavorite = createAsyncThunk("ADD_FAVORITES", (data) => {
    
    return axios
      .post("http://localhost:5000/api/addfavorites", data)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  });
  export const getSingleMovie = createAsyncThunk("GET_SINGLEMOVIE", (id) => {
    return axios
      .post(`http://www.omdbapi.com/?i=${id}&apikey=bff7b362`)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  });

  const initialState = {
    movies: [],
    favorites:[],
    singleMovie: {},
  };

  export const moviesReducer = createReducer(initialState, {
    [getMovies.fulfilled]: (state, action) => {
        return {
          ...state,
          movies: action.payload,
        };
      },
    [getSingleMovie.fulfilled]: (state, action) => {
        return {
          ...state,
          singleMovie: action.payload,
        };
      },
    [addFavorite.fulfilled]: (state, action) => {
        return {
          ...state,
          favorites: action.payload,
        };
      },

  });
