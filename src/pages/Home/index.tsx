// import { useEffect, useState } from "react";
// import tmdbService from "../../services/moviedb";
import MovieCard from "../../components/MovieCard";

import './style.css';
import ListCard from "../../components/ListCard";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getListsData, handleGetWatched } from "../../services/lists";
const Home = () => {

  // const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const { isLoading, error, data: lists } = useQuery(['movie-list-lists'],
    () => getListsData().then(res => {
      console.log(res);
      return res
    }));

    const { data: watched } = useQuery(['movie-list-watched'],
    () => handleGetWatched().then(res => {
      console.log(res);
      return res
    }));
  

  // useEffect(() => {
  //   const fetchPopularMovies = async () => {
  //     try {
  //       const response = await tmdbService.get('/movie/popular');
  //       setPopularMovies(response.data.results);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching popular movies:', error);
  //     }
  //   };
  //   fetchPopularMovies();
  // }, []);

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Ocorreu um erro:</p>;

  return (
    <div className="home container">
      <Link to="search" className="sub-title search-btn">PESQUISAR FILMES/SÉRIES</Link>
      <p className="sub-title">Nossas Listas</p>
      <div className="list-section">
        {lists?.map((list, index) => (
          <ListCard {...list} key={index}/>
        ))}
      </div>
      <p className="sub-title">Assistidos Recentemente</p>
      <div className="recently-section">
        {watched?.map(movie => (
          <MovieCard {...movie} />
        ))}
      </div>
    </div>
  )
}

export default Home;