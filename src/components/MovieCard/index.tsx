import { Link } from 'react-router-dom';
import './style.css';

interface MovieCardProps {
  id?: string;
  original_title?: string;
  overview?: string;
  release_date?: string;
  title?: string;
  poster_path?: string;
  name?: string;
  first_air_date?: string;
}

const MovieCard = ({id, release_date, title, poster_path, name, first_air_date}: MovieCardProps) => {
  return (
    <Link key={id} className='movie-card' to={`/movie/${id}`}>
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
      <h2>{title ? title : name}</h2>
      <p>{title ? release_date?.split('-')[0] : first_air_date?.split('-')[0]}</p>
    </Link>
  )
}

export default MovieCard;