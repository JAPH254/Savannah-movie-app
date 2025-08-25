import { useAppDispatch, useAppSelector } from "../pages/hooks";
import { setQuery } from "../slices/moviesSlice";

export default function Navbar() {
  const d = useAppDispatch();
  const q = useAppSelector((s) => s.movies.q);

  return (
    <header className="sticky top-0 bg-white shadow z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold text-gray-800">🎥 Movie Explorer</h1>
        <input
          type="text"
          placeholder="Search movies…"
          value={q}
          onChange={(e) => d(setQuery(e.target.value))}
          className="border rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </header>
  );
}
