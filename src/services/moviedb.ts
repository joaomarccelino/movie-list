import axios from 'axios';

const apiKey = "f48aa9c2661f75c1ce616059c2d6dc3e"
const baseUrl = 'https://api.themoviedb.org/3';

const tmdbService = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
    language: 'pt-BR', // ou a linguagem desejada
  },
});

export const getMovieById = async (mediaType: string, movieId: string) => {
  try {
    const response = await tmdbService.get(`/${mediaType}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
}

export default tmdbService;