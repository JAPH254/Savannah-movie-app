import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setQuery } from "../slices/MovieSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const q = useSelector((s: RootState) => s.movies.q);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 bg-white w-full shadow z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-gray-800">🎥 Movie Explorer</h1>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search movies…"
          value={q}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          className="border text-black rounded-lg px-3 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full md:w-auto"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
