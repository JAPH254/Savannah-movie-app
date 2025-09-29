import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetails, clearSelected } from "../slices/MovieSlice";
import { RootState, AppDispatch } from "../store";

export default function MovieDetailsModal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selected, status, error } = useSelector((s: RootState) => s.movies);

  useEffect(() => {
    if (id) dispatch(fetchDetails(Number(id)));
    return () => {
      dispatch(clearSelected());
    };
  }, [id, dispatch]);

  const closeModal = () => {
    navigate("/"); 
  };

  if (status === "loading") return <p className="p-4">Loading...</p>;
  if (status === "error") return <p className="p-4 text-red-500">{error}</p>;
  if (!selected) return null;

  const img = selected.poster_path
    ? `https://image.tmdb.org/t/p/w500${selected.poster_path}`
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 text-gray-800">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative p-6">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {img && (
            <img
              src={img}
              alt={selected.title}
              className="w-64 rounded-lg shadow-md"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold">{selected.title}</h1>
            <p className="text-gray-500">
              Released: {selected.release_date} {selected.status && `(${selected.status})`}
            </p>
            {selected.tagline && (
              <p className="italic text-gray-600 mt-1">{selected.tagline}</p>
            )}
            {selected.overview && (
              <p className="mt-4 text-gray-700">{selected.overview}</p>
            )}

            {selected.vote_average && (
              <p className="mt-2 text-yellow-600 font-medium">
                ⭐ {selected.vote_average.toFixed(1)} / 10 ({selected.vote_count} votes)
              </p>
            )}

            <ul className="mt-4 text-sm text-gray-700 space-y-1">
              {selected.runtime && <li><strong>Runtime:</strong> {selected.runtime} min</li>}
              {selected.genres?.length > 0 && (
                <li><strong>Genres:</strong> {selected.genres.map((g:any) => g.name).join(", ")}</li>
              )}
              {selected.original_language && (
                <li><strong>Language:</strong> {selected.original_language}</li>
              )}
              {selected.production_countries?.length > 0 && (
                <li><strong>Countries:</strong> {selected.production_countries.map((c:any) => c.name).join(", ")}</li>
              )}
              {selected.budget > 0 && (
                <li><strong>Budget:</strong> ${selected.budget.toLocaleString()}</li>
              )}
              {selected.revenue > 0 && (
                <li><strong>Revenue:</strong> ${selected.revenue.toLocaleString()}</li>
              )}
              {selected.popularity && (
                <li><strong>Popularity:</strong> {selected.popularity}</li>
              )}
            </ul>

            {selected.homepage && (
              <a
                href={selected.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                Official Website
              </a>
            )}
          </div>
        </div>

        {/* Top Cast */}
        {selected.credits?.cast?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selected.credits.cast.slice(0, 8).map((actor: any) => (
                <div key={actor.cast_id || actor.id} className="bg-white rounded-lg shadow p-2">
                  {actor.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                  <p className="text-xs text-gray-500">as {actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crew */}
        {selected.credits?.crew?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Crew</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {selected.credits.crew.slice(0, 12).map((member: any, idx: number) => (
                <li key={member.credit_id || idx}>
                  <strong>{member.job}:</strong> {member.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Production Companies */}
        {selected.production_companies?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Production Companies</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {selected.production_companies.map((c: any) => (
                <li key={c.id} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                  {c.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${c.logo_path}`}
                      alt={c.name}
                      className="h-6"
                    />
                  )}
                  <span>{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
