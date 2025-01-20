import { validateToken } from "@/validation/token-validation";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  token: string;
  authenticationPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  token,
  authenticationPath,
}) => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const validate = async () => {
      if (token) {
        const isValid = await validateToken(token);
        setIsTokenValid(isValid);
      } else {
        setIsTokenValid(false);
      }
    };

    validate();
  }, [token, location]);

  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  if (!isTokenValid) {
    return <Navigate to={authenticationPath} replace />;
  }

  return <Outlet />;
};
