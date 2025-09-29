// src/pages/RegisterPage.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { registerUser } from "../slices/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    setLocalError("");
    dispatch(registerUser(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        placeholder="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        placeholder="Confirm Password"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <button type="submit">Register</button>

      {localError && <p role="alert">{localError}</p>}
      {error?.email && <p role="alert">{error.email}</p>}
      {error?.username && <p role="alert">{error.username}</p>}
    </form>
  );
}
