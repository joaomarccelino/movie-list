import './style.css';

interface ListCardProps {
  title: string;
  quantity: number;
  backgroundImage: string;
}

const ListCard = ({ title, quantity, backgroundImage }: ListCardProps) => {


  return (
    <div className='list-card' >
        <img src={backgroundImage} alt="" />
        <div className="card-content">
          <h2 className='list-title'>{title}</h2>
          <p className='list-quantity'>{`${quantity} títulos`}</p>
        </div>
      </div>
  )
}

export default ListCard;