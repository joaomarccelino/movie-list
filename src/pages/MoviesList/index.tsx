import { useQuery } from "react-query";
import { handleGetAllMovies } from "../../services/lists";
import MovieListCard from "../../components/MovieListCard";
import './style.css';

const MoviesList = () => {
  const { isLoading, error, data: movies } = useQuery(['movie-list-movies'],
    () => handleGetAllMovies().then(res => {
      return res
    }));

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Ocorreu um erro:</p>;

  if (movies?.length === 0) return <p>Nenhum filme adicionado à lista</p>

  return (
    <>
      <main className="container">
        <h1 className="movies-list-title">FILMES</h1>
        <div className="movies-list">
          {
            movies?.map((movie, index) => (
              <MovieListCard {...movie} key={index} />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default MoviesList;