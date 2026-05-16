import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FullPageLoader } from "../components/common/FullPageLoader";

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};