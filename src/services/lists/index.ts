import { addDoc, collection, getDocs } from "firebase/firestore"
import { firestore } from "../firebase"

export interface AddMovieProps {
  id: string;
  original_title: string;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string;
}

export interface AddSerieProps {
  id: string;
  name: string;
  first_air_date: string;
  last_air_date: string;
  overview: string;
  poster_path: string;
}

export const handleAddMovieToList = async (data: AddMovieProps) => {
  const movieRef = collection(firestore, "movies");
  await addDoc(movieRef, data);
}

export const handleAddSerieToList = async (data: AddSerieProps) => {
  const serieRef = collection(firestore, "series");
  await addDoc(serieRef, data);
}

export const handleGetAllMovies = async (): Promise<AddMovieProps[]> => {
  const moviesRef = collection(firestore, "movies");
  const moviesSnapshot = await getDocs(moviesRef);
  const moviesDataPromises: Promise<AddMovieProps>[] = moviesSnapshot.docs.map(async (movieDoc) => {
    const movieData = movieDoc.data();
    const movieResult: AddMovieProps = {
      id: movieData.id,
      original_title: movieData.original_title,
      overview: movieData.original_title,
      release_date: movieData.release_date,
      title: movieData.title,
      poster_path: movieData.poster_path
    }
    return movieResult;
  });

  const moviesData = await Promise.all(moviesDataPromises);

  return moviesData;
}

export const handleGetAllSeries = async (): Promise<AddSerieProps[]> => {
  const seriesRef = collection(firestore, "series");
  const seriesSnapshot = await getDocs(seriesRef);
  const seriesDataPromises: Promise<AddSerieProps>[] = seriesSnapshot.docs.map(async (serieDoc) => {
    const serieData = serieDoc.data();
    const serieResult: AddSerieProps = {
      id: serieData.id,
      name: serieData.name,
      first_air_date: serieData.first_air_date,
      last_air_date: serieData.last_air_date,
      overview: serieData.overview,
      poster_path: serieData.poster_path
    }
    return serieResult;
  });

  const seriesData = await Promise.all(seriesDataPromises);

  return seriesData;
}

export const getListsData = async () => {
  const moviesListData = await handleGetAllMovies();
  const seriesListData = await handleGetAllSeries();

  const lists = [
    {
      title: 'Filmes',
      quantity: moviesListData.length,
      backgroundImage: moviesListData[0]?.poster_path,
      type: 'movies'
    },
    {
      title: 'Séries',
      quantity: seriesListData.length,
      backgroundImage: seriesListData[0]?.poster_path,
      type: 'series'
    }
  ]

  return lists
}