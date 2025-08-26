import { api } from "../api/axios";
import { MoviePage, Movie } from "../types/movie";

export async function getTrending(page = 1): Promise<MoviePage> {
  const { data } = await api.get<MoviePage>("/api/trending/", { params: { page } });
  console.log(data)
  return data;
}

export async function searchMovies(q: string, page = 1): Promise<MoviePage> {
  const { data } = await api.get<MoviePage>("/api/search/", { params: { q, page } });
  return data;
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const { data } = await api.get<Movie>(`/api/movie/${id}/`);
  return data;
}
