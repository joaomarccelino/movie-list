import { useQuery } from "react-query";
import { handleGetAllSeries } from "../../services/lists";
import MovieCard from "../../components/MovieCard";
import Header from "../../components/Header";

const SeriesList = () => {
  const { isLoading, error, data: series } = useQuery(['movie-list-series'],
    () => handleGetAllSeries().then(res => {
      return res
    }));

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Ocorreu um erro:</p>;

  if (series?.length === 0) return <p>Nenhuma série adicionada à lista</p>

  return (
    <>
      <Header />
      <main className="container">
        <div className="recently-section">
          {
            series?.map((movie, index) => (
              <MovieCard {...movie} key={index} />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default SeriesList;