import { useQuery } from "react-query";
import { handleGetAllSeries } from "../../services/lists";
import MovieListCard from "../../components/MovieListCard";

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
      <main className="container">
        <h1 className="movies-list-title">SÉRIES</h1>
        <div className="series-list">
          {
            series?.map((movie, index) => (
              <MovieListCard {...movie} key={index} />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default SeriesList;