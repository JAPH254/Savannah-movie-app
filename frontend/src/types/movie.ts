export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  media_type: string;
};

export type MoviePage = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
