import { useState } from 'react';
import './style.css';
interface SearchInputProps {
  onSearch(newQuery: any): void;
}

const SearchComponent = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: any) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div>
       <p className="sub-title">Procure por um filme/série</p>
      <input
      className='search-input'
        type="text"
        placeholder="Digite o nome do filme/série"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;