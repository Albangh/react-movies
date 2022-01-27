import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Form = () => {

     const [moviesData, setMoviesData] = useState([]);
     const [search, setSearch] = useState('code');
     const [sortGoodBad, setSortGoodBad] = useState(null);

     useEffect(() => {
          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=49e4ee1a7bd239ee00e882c75d6a5489&query=${search}&language=fr-FR`)
          .then((res) => setMoviesData(res.data.results));
     }, [search]);


     return (
          <div className="form-component">
               <div className="form-container">
                    <form>
                         <input 
                              type="text" 
                              placeholder="Entrez un film" 
                              id="search-input"
                              onChange={(event) => setSearch(event.target.value)}
                          />
                         <input type="submit" value="Rechercher" />
                    </form>

                    <div className="btn-sort-container">
                         <div 
                              className="btn-sort" 
                              id="goodToBad" 
                              onClick={() => setSortGoodBad("goodToBad")}>
                                   Top<span>&#10132;</span>
                         </div>
                         <div 
                              className="btn-sort" 
                              id="badToGood" 
                              onClick={() => setSortGoodBad("badToGood")}>
                                   Flop<span>&#10132;</span>
                         </div>
                    </div>
               </div>
               <div className="result">
                    {
                         moviesData
                              .slice(0, 12)
                              .sort((a, b) => {
                                   if(sortGoodBad === "goodToBad"){
                                        return b.vote_average - a.vote_average
                                   } else if (sortGoodBad === "badToGood") {
                                        return a.vote_average - b.vote_average
                                   }
                              })
                              .map((movie) => (
                              <Card key={movie.id} movie={movie}/>
                         ))
                    }
               </div>
          </div>
     );
};

export default Form;