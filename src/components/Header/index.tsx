import { Link } from 'react-router-dom';
import Logo from '../../assets/bx_camera-movie.svg';

import './style.css';

const Header = () => {
  return (
    <header className='header'>
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>
    </header>
  )
}

export default Header