import { useEffect, useState } from "react";
import tmdbService from "../../services/moviedb";
import MovieCard from "../../components/MovieCard";
import Movie from '../../assets/movies.jpg';
import Serie from '../../assets/series.jpg';

import './style.css';
import ListCard from "../../components/ListCard";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
const Home = () => {

  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  const lists = [
    {
      title: 'Filmes',
      quantity: 15,
      backgroundImage: Movie
    },
    {
      title: 'Séries',
      quantity: 14,
      backgroundImage: Serie
    }
  ]

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await tmdbService.get('/movie/popular');
        setPopularMovies(response.data.results);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };
    fetchPopularMovies();
  }, []);


  return (
    <div className="home">
      <Header />
      <Link to="search" className="sub-title search-btn">PESQUISAR FILMES/SÉRIES</Link>
      <p className="sub-title">Nossas Listas</p>
      <div className="list-section">
        {lists.map(list => (
          <ListCard {...list} />
        ))}
      </div>
      <p className="sub-title">Assistidos Recentemente</p>
      <div className="recently-section">
        {popularMovies.map(movie => (
          <MovieCard {...movie} />
        ))}
      </div>
    </div>
  )
}

export default Home;