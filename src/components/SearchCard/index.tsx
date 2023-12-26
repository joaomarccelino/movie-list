import { Link } from 'react-router-dom';
import './style.css';

interface SearchCardProps {
  id: string;
  original_title: string;
  original_name: string;
  release_date: string;
  poster_path: string;
  runtime: string | number;
  media_type: string;
  first_air_date: string;
  last_air_date: string;
}

const SearchCard = ({id, original_title, original_name, release_date, poster_path, media_type, first_air_date}: SearchCardProps) => {
  return (
    <Link to={`/${media_type}/${id}`} className='search-card'>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Imagem não encontrada" />
      <div className="search-movie-info">
      <h3>{original_title || original_name}</h3>
      <p>{original_title ? release_date?.split('-')[0] : first_air_date?.split('-')[0]}</p>
      <p>{media_type === "movie" ? "Filme" : "Série"}</p>
      </div>
    </Link>
  )
}

export default SearchCard;