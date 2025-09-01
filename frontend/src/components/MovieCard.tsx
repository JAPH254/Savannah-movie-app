import { Link } from "react-router-dom";
import { Movie } from "../types/movie";
import { useState } from "react";

export default function MovieCard({ m }: { m: Movie }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const img = m.poster_path
    ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
    : "";

  return (
    <Link
      to={`/movie/${m.id}`}
      className="block rounded-2xl shadow-md hover:shadow-xl bg-white overflow-hidden transition"
    >
      {img ? (
        <div className="relative w-full h-72 bg-gray-200">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Skeleton background */}
              <div className="absolute inset-0 animate-pulse bg-gray-300" />

              {/* Spinner */}
              <div className="relative">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              </div>
            </div>
          )}
          <img
            src={img}
            alt={m.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-72 object-cover transition-opacity duration-700 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ) : (
        <div className="h-72 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{m.title}</h3>
        <p className="text-xs text-gray-500">Released on {m.release_date}</p>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="text-yellow-500">★</span>
          <span>
            Average {m.vote_average.toFixed(1)} with ({m.vote_count}) votes
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mt-2">
          <b>Summary</b> {m.overview}
        </p>
      </div>
    </Link>
  );
}
