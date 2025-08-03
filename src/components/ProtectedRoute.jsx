import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firestore";
import Loader from "../components/Loader/Loader"


const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <Loader/>
    );
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
