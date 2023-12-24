import { useEffect, useState } from 'react';
import './style.css';
import { getMovieById } from '../../services/moviedb';
import { useNavigate, useParams } from 'react-router-dom';


const MovieDetails = () => {
  const {id} = useParams();
  const [movieData, setMovieData] = useState<any>({});
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieById(id || '');
        setMovieData(movieDetails);
        console.log(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }
    fetchMovieDetails();
  }, [id])

  return (
    <div className='movie-details'>
      <button className='back-button' onClick={handleGoBack}>Voltar</button>
      <img src={`https://image.tmdb.org/t/p/w300${movieData.backdrop_path}`} alt="" />
      <h1>{movieData.title} <small>{movieData.release_date?.split('-')[0]}</small></h1> 
      <p>{movieData.runtime} minutos</p>
      <p>{movieData.media_type}</p>
      <h2>Sinopse</h2>
      <p>{movieData.overview}</p>
      <div className="actions">
        <button>Adicionar a Lista</button>
        <button>Assistir Agora</button>
      </div>
    </div>
  )
}

export default MovieDetails;