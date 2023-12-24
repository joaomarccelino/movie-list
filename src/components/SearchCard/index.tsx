import { Link } from 'react-router-dom';
import './style.css';

interface SearchCardProps {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  runtime: string | number;
}

const SearchCard = ({id, title, release_date, poster_path, runtime}: SearchCardProps) => {
  return (
    <Link to={`/movie/${id}`} className='search-card'>
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
      <div className="search-movie-info">
      <h3>{title}</h3>
      <p>{release_date?.split('-')[0]} | {runtime} minutos</p>
      </div>
    </Link>
  )
}

export default SearchCard;