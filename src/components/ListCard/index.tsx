import { Link } from 'react-router-dom';
import './style.css';

interface ListCardProps {
  title: string;
  quantity: number;
  backgroundImage: string;
  type: string
}

const ListCard = ({ title, quantity, backgroundImage, type }: ListCardProps) => {


  return (
    <Link to={`/${type}`} className='list-card' >
      <img src={`https://image.tmdb.org/t/p/w300${backgroundImage}`} alt="Imagem não disponível" />
      <div className="card-content">
        <h2 className='list-title'>{title}</h2>
        <p className='list-quantity'>{`${quantity} títulos`}</p>
      </div>
    </Link>
  )
}

export default ListCard;