import React from "react";
import MovieList from './movieList'
import { useDispatch, useSelector } from 'react-redux';
import {addFavorite} from '../../state/movies'




const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const token = localStorage.getItem("token");
    

    const handleAddFavorites = (movie)=>{
        const data={
            movieData: movie,
            user:user
        }
        if(token){
            dispatch(addFavorite(data))
            .then((res)=>{
                if(res.payload === "Movie added to you favorite list") alert("Movie added to your favorites")
                else alert("The movie is already in your favorites")
            })
        }
        else alert("You must be logged to add favorites")
    }


    return(
        <div className='container-fluid'>
            <h1>Movies</h1>
        
            <MovieList  handleAddFavorites={handleAddFavorites}/>
            
            
        </div>
    )

}
    export default Home;