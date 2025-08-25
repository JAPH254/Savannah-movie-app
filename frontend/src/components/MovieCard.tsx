import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

export default function MovieCard({ m }: { m: Movie }) {
  const img = m.poster_path
    ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
    : "";

  return (
    <Link
      to={`/movie/${m.id}`}
      className="block rounded-2xl shadow-md hover:shadow-xl bg-white overflow-hidden transition"
    >
      {img ? (
        <img
          src={img}
          alt={m.title}
          className="w-full h-72 object-cover"
        />
      ) : (
        <div className="h-72 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{m.title}</h3>
        <p className="text-xs text-gray-500">{m.release_date}</p>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="text-yellow-500">★</span>
          <span>{m.vote_average.toFixed(1)} ({m.vote_count})</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mt-2">
          {m.overview}
        </p>
      </div>
    </Link>
  );
}
