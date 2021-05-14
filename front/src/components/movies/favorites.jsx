import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, sendToken } from "../../state/user";



const Favorites = ({handleAddFavorites}) => {
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.users.favorites);
    const user = useSelector((state) => state.users.user);
    const token = localStorage.getItem("token");


    useEffect(() => {
        if(token){
          dispatch(sendToken(token))
        }
      }, []);

      const removeFromFavorites = (movie) =>{
        if(user){
          const data={
            movieData: movie,
            user:user.username
          }
         dispatch(removeFavorite(data))
        }
       
        // else alert("You must be logged to add favorites")
      }

    return(
        <>
        <h1>Favorites</h1>
            {favorites && favorites.map((movie,index)=>(
                <div className="row-favorites">
                 <div className= "movie">
                   <img src={movie.Poster} alt="movie"></img>
                   <div className="overlay" onClick={()=>removeFromFavorites(movie)}>
                      <span>Remove from favorites</span> 
                      <i class="material-icons remove" style={{color:'white', fontSize:'20px'}}>highlight_off</i>
                       </div>
                </div>
                </div>
               ))}
          
        </>
    )

}
    export default Favorites;