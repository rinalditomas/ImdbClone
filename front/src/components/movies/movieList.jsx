import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleMovie } from "../../state/movies";



const MovieList = ({handleAddFavorites}) => {
    const movieList = useSelector((state) => state.movies.movies); 
    const dispatch = useDispatch();

    

    // useEffect(() => {
    //     dispatch(getSingleMovie(match.id))
    // }, [])
    const handleClick =  (movie)=>{
        
     dispatch(getSingleMovie(movie.imdbID))
    
    }
    



    return(
        <>
            {movieList && movieList.map((movie,index)=>(
                <div className="row-favorites">
                 <div className= "movie">
                     {/* <Link to={`/movie/${movie.imdbID}`} onClick={()=>toogle? setToogle(false):setToogle(true)}><img src={movie.Poster} alt="movie"></img></Link> */}
                      <Link to={`/movie/${movie.imdbID}`}><img src={movie.Poster} alt="movie" onClick={()=>handleClick(movie)}></img></Link>
                   <div className="overlay" onClick={()=>handleAddFavorites(movie)}>
                      <span>Add to Favorites</span> 
                       <i class="material-icons">favorite</i>
                       </div>
                </div>
              </div>
           
                
               ))}
          
        </>
    )

}
    export default MovieList;