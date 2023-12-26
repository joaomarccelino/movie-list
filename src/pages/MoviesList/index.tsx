import { useQuery } from "react-query";
import { handleGetAllMovies } from "../../services/lists";
import MovieCard from "../../components/MovieCard";
import Header from "../../components/Header";

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
      <Header />
      <main className="container">
        <div className="recently-section">
          {
            movies?.map((movie, index) => (
              <MovieCard {...movie} key={index} />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default MoviesList;