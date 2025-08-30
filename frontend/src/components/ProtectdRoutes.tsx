import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../slices/authSlice";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { token } = useSelector(selectAuth);

  return token ? children : <Navigate to="/login" replace />;
}
