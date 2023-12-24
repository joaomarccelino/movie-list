import { Link } from 'react-router-dom';
import './style.css';

interface MovieCardProps {
  id: string;
  original_title: string;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string;
}

const MovieCard = ({id, release_date, title, poster_path}: MovieCardProps) => {
  return (
    <Link key={id} className='movie-card' to={`/movie/${id}`}>
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
      <h2>{title}</h2>
      <p>{release_date.split('-')[0]}</p>
    </Link>
  )
}

export default MovieCard;