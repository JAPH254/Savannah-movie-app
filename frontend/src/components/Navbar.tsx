import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setQuery } from "../slices/MovieSlice";

export default function Navbar() {
  const d = useDispatch();
  const q = useSelector((s: RootState) => s.movies.q);

  return (
    <header className="fixed top-0 bg-white w-full shadow z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold text-gray-800">🎥 Movie Explorer</h1>
        <input
          type="text"
          placeholder="Search movies…"
          value={q}
          onChange={(e) => d(setQuery(e.target.value))}
          className="border text-black rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </header>
  );
}
