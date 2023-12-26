import { useEffect, useState } from 'react';
import './style.css';
import { getMovieById } from '../../services/moviedb';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { handleAddMovieToList, handleAddSerieToList } from '../../services/lists';


const MovieDetails = () => {
  const { media, id } = useParams();
  const [movieData, setMovieData] = useState<any>({});
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieById(media || '', id || '');
        setMovieData(movieDetails);
        console.log(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  const queryClient = useQueryClient();
  const {
    mutate: addNewMovie,
  } = useMutation(handleAddMovieToList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-list-movies']);
      navigate('/');
    }
  });

  const {
    mutate: addNewSerie,
  } = useMutation(handleAddSerieToList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-list-series']);
      navigate('/');
    }
  });

  const handleAddMovie = () => {
    if (movieData.title) {
      const newMovieData = {
        id: movieData.id,
        original_title: movieData.original_title,
        overview: movieData.overview,
        release_date: movieData.release_date,
        title: movieData.title,
        poster_path: movieData.poster_path
      }
      addNewMovie(newMovieData)
    } else {
      const newSerieData = {
        id: movieData.id,
        name: movieData.name,
        first_air_date: movieData.first_air_date,
        last_air_date: movieData.last_air_date,
        overview: movieData.overview,
        poster_path: movieData.poster_path
      }
      addNewSerie(newSerieData)
    }

  }

  return (
    <div className='movie-details container'>
      <button className='back-button' onClick={handleGoBack}>Voltar</button>
      <img src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} alt="" />
      <h1>{movieData.title || movieData.name} <small>{movieData.title ? movieData.release_date?.split('-')[0] : movieData.first_air_date?.split('-')[0] + "-" + movieData.last_air_date?.split('-')[0]}</small></h1>
      {movieData.runtime && <p>{movieData.runtime} minutos</p>}
      <p>{movieData.title ? "Filme" : "Série"}</p>
      <h2>Sinopse</h2>
      <p>{movieData.overview}</p>
      <div className="actions">
        <button onClick={handleAddMovie}>Adicionar a Lista</button>
        <button>Assistir Agora</button>
      </div>
    </div>
  )
}

export default MovieDetails;