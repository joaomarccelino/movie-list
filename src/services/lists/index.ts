import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { firestore } from "../firebase"

export interface AddMovieProps {
  uid?: string;
  id: string;
  original_title: string;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string;
}

export interface AddSerieProps {
  uid?: string;
  id: string;
  name: string;
  first_air_date: string;
  last_air_date: string;
  overview: string;
  poster_path: string;
}

interface WatchedMovieProps {
  uid?: string;
  id: string;
  original_title?: string;
  overview: string;
  release_date?: string;
  title?: string;
  poster_path: string;
  name?: string;
  first_air_date?: string;
  last_air_date?: string;
}

export const handleAddMovieToList = async (data: AddMovieProps) => {
  const movieRef = collection(firestore, "movies");
  await addDoc(movieRef, data);
}

export const handleRemoveMovie = async (id: string) => {
  const movieRef = doc(collection(firestore, "movies"), id);
  await deleteDoc(movieRef);
}

export const handleAddSerieToList = async (data: AddSerieProps) => {
  const serieRef = collection(firestore, "series");
  await addDoc(serieRef, data);
}

export const handleRemoveSerie = async (id: string) => {
  const series = doc(collection(firestore, "series"), id);
  await deleteDoc(series);
}

export const handleMovieToWatched = async (id: string) => {
  const watchlistRef = doc(collection(firestore, 'movies'), id);
  const watchlistDoc = await getDoc(watchlistRef);

  if (watchlistDoc.exists()) {
    const watchedRef = collection(firestore, 'watched');
    await addDoc(watchedRef, watchlistDoc.data());
    await deleteDoc(watchlistRef)
  } else {
    console.error('Document does not exist in watchlist');
  }
}

export const handleSerieToWatched = async (id: string) => {
  const watchlistRef = doc(collection(firestore, 'series'), id);
  const watchlistDoc = await getDoc(watchlistRef);

  if (watchlistDoc.exists()) {
    const watchedRef = collection(firestore, 'watched');
    await addDoc(watchedRef, watchlistDoc.data());
    await deleteDoc(watchlistRef)
  } else {
    console.error('Document does not exist in watchlist');
  }
}

export const handleGetAllMovies = async (): Promise<AddMovieProps[]> => {
  const moviesRef = collection(firestore, "movies");
  const moviesSnapshot = await getDocs(moviesRef);
  const moviesDataPromises: Promise<AddMovieProps>[] = moviesSnapshot.docs.map(async (movieDoc) => {
    const movieData = movieDoc.data();
    const movieResult: AddMovieProps = {
      uid: movieDoc.id,
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
      uid: serieDoc.id,
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

export const handleGetWatched = async (): Promise<WatchedMovieProps[]> => {
  const watchedRef = collection(firestore, "watched");
  const watchedSnapShot = await getDocs(watchedRef);
  const moviesDataPromises: Promise<WatchedMovieProps>[] = watchedSnapShot.docs.map(async (movieDoc) => {
    const movieData = movieDoc.data();
    if (movieData.name) {
      const movieResult: WatchedMovieProps = {
        uid: movieDoc.id,
        id: movieData.id,
        original_title: movieData.original_title,
        overview: movieData.original_title,
        release_date: movieData.release_date,
        title: movieData.title,
        poster_path: movieData.poster_path
      }
      return movieResult;
    } else {
      const serieResult: WatchedMovieProps = {
        uid: movieDoc.id,
        id: movieData.id,
        name: movieData.name,
        first_air_date: movieData.first_air_date,
        last_air_date: movieData.last_air_date,
        overview: movieData.overview,
        poster_path: movieData.poster_path
      }
      return serieResult;
    }
  });

  const moviesData = await Promise.all(moviesDataPromises);

  return moviesData;
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