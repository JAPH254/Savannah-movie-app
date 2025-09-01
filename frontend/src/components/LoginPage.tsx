import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuth } from "../slices/authSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, token } = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "succeeded" && token) {
      navigate("/");
    }
  }, [status, token, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <p className="mt-4 text-center">
        Don't have an account? <a href="/register" className="text-blue-600">Register</a>
      </p>
      
    </div>
  );
}
