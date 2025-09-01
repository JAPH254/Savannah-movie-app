// src/pages/Register.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { registerUser } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // local state to store backend field errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({}); // reset

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: ["Passwords do not match"] });
      return;
    }

    const result = await dispatch(
      registerUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    if (typeof result.payload === "object" && result.payload !== null) {
      setFieldErrors(result.payload as Record<string, string[]>);
    } else {
      setFieldErrors({ general: ["Something went wrong."] });
    }

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h2>

        {/* General error */}
        {error && typeof error === "string" && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["first_name", "last_name", "username", "email"].map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium text-gray-600 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  fieldErrors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {fieldErrors[field] && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors[field].join(", ")}
                </p>
              )}
            </div>
          ))}

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors["password"]
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
            />
            {fieldErrors["password"] && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors["password"].join(", ")}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                fieldErrors["confirmPassword"]
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
            />
            {fieldErrors["confirmPassword"] && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors["confirmPassword"].join(", ")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
