import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <header className='header'>
      <Link to="/">
        <h1>MOVIE LIST</h1>
      </Link>
    </header>
  )
}

export default Header