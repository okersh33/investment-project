import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userAuth = useUserAuth();

  if (!userAuth.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
