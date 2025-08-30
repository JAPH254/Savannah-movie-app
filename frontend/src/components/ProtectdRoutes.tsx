import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../slices/authSlice";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useSelector(selectAuth);
  return token ? children : <Navigate to="/login" />;
}
