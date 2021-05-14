import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSingleMovie} from '../../state/movies'

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          width:'90%',
          height: 0.1,
          
      }}
  />
);

const SingleMovie = ({match}) => {
    const dispatch = useDispatch()
    const movie = useSelector((state) => state.movies.singleMovie);
    
    useEffect(() => {
        dispatch(getSingleMovie(match.id))
      }, []);
  
    return(
      <div className="container-singleMovie">
           <div className="modal-content">
                  <div className="poster">
                          <img src={movie.Poster} alt="" />
                  </div>
                  <div className="info">
                  <ColoredLine color="lightgrey" />
                    <div className="header">
                          <h1 className="movie-title">{movie.Title}</h1>
                          <h1 className="movie-rating">{movie.imdbRating}</h1>
                    </div>
                    <div className="data">
                          <p className="rated">{movie.Rated}</p>
                          <p className="runtime">{movie.Runtime}</p>
                          <p className="genre">{movie.Genre}</p>
                    </div>
                    <div className="plot">
                            <p>{movie.Plot}</p>
                    <ColoredLine color="lightgrey" />
                    </div>
                  </div>
           </div>
           </div>
    )

}
    export default SingleMovie;