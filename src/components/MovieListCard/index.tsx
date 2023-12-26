import { Link } from 'react-router-dom';
import './style.css';
import { useMutation, useQueryClient } from 'react-query';
import { handleMovieToWatched, handleRemoveMovie, handleRemoveSerie, handleSerieToWatched } from '../../services/lists';

interface MovieCardProps {
  uid?: string;
  id: string;
  original_title?: string;
  overview?: string;
  release_date?: string;
  title?: string;
  poster_path?: string;
  name?: string;
  first_air_date?: string;
}

const MovieListCard = ({ uid, id, release_date, title, poster_path, name, first_air_date }: MovieCardProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: removeMovie,
  } = useMutation(handleRemoveMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-list-movies']);
    }
  });

  const {
    mutate: watchMovie,
  } = useMutation(handleMovieToWatched, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-list-movies']);
    }
  });

  const {
    mutate: removeSerie,
  } = useMutation(handleRemoveSerie, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-list-series']);
    }
  });

  const {
    mutate: watchSerie,
  } = useMutation(handleSerieToWatched, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-list-series']);
    }
  });

  const handleRemove = (movieId: string) => {
    title ? removeMovie(movieId) : removeSerie(movieId)
  }

  const handleMove = (movieId: string) => {
    title ? watchMovie(movieId) : watchSerie(movieId)
  }

  return (
    <div className="movie-list-card">
      <Link key={id} to={`/movie/${id}`}>
        <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
      </Link>
      <div className="movie-list-card-info">
        <h2>{title ? title : name}</h2>
        <p>{title ? release_date?.split('-')[0] : first_air_date?.split('-')[0]}</p>
      </div>
      <div className="list-actions">
        <button onClick={() => uid && handleMove(uid)} className='list-actions-button watched-button'>Assistido</button>
        <button onClick={() => uid && handleRemove(uid)} className='list-actions-button remove-button'>Remover</button>
      </div>
    </div>
  )
}

export default MovieListCard;