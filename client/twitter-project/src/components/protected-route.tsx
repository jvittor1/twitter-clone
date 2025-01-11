import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
}) => {
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={authenticationPath} replace />
  );
};
