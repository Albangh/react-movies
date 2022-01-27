import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

const UserList = () => {
     const [listdata, setListData] = useState([]);

     useEffect(() => {
          let moviesId = window.localStorage.movies ? window.localStorage.movies.split(",") : [];

          for(let i = 0; i < moviesId.length; i++){
               axios
               .get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=49e4ee1a7bd239ee00e882c75d6a5489&language=fr-FR`)
               .then((res) => setListData((listdata) => [...listdata, res.data]));
          }
          
     }, [])


     return (
          <div className="user-list-page">
               <Header />
               <h2>Coup de coeur <span>💖</span></h2>
               <div className="result">
                    {
                         listdata.length > 0 ? (
                              listdata.map((movie) => <Card key={movie.id} movie={movie}/>)
                         ) : (
                              <h2>Aucun coup de coeur pour le moment</h2>
                         )
                    }
               </div>
          </div>
     );
};

export default UserList;