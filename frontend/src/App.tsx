import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/movie/:id"
        element={
          <MovieDetails
            m={{
              id: 0,
              title: "",
              original_title: "",
              overview: "",
              poster_path: null,
              backdrop_path: null,
              release_date: "",
              vote_average: 0,
              vote_count: 0,
              popularity: 0,
              genre_ids: [],
              original_language: "",
              media_type: "",
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
