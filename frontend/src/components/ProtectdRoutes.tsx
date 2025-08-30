import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { selectAuth, getUser, refreshToken } from "../slices/authSlice";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, user } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token && !user) {
      dispatch(getUser()); 
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (!token) {
      dispatch(refreshToken()); 
    }
  }, [token, dispatch]);

  if (!token) return <Navigate to="/login" />;
  return children;
}
