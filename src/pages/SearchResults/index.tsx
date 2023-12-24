import { useEffect, useState } from "react";
import tmdbService from "../../services/moviedb";
import SearchComponent from "../../components/SearchInput";
import Header from "../../components/Header";
import SearchCard from "../../components/SearchCard";
import './style.css';

const SearchResults = () => {
  const [searchData, setSearchData] = useState<any>();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (query.trim() === '') {
          setSearchData([]);
          return;
        }

        const response = await tmdbService.get('/search/multi', {
          params: {
            query,
          },
        });
        console.log(response.data.results)
        setSearchData(response.data.results);
      } catch (error) {
        console.error('Error searching:', error);
      }
    };

    handleSearch();
  }, [query]);
  return (
    <div className="search-results-main">
      <Header />
      <SearchComponent onSearch={setQuery} />
      <div className="search-results">
        {searchData?.map((result: any) => (
          <SearchCard {...result} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults;