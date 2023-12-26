import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import SearchResults from './pages/SearchResults'
import { QueryClient, QueryClientProvider } from 'react-query'
import MoviesList from './pages/MoviesList'
import SeriesList from './pages/SeriesList'

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:media/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/series" element={<SeriesList />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
