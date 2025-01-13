import { User } from "@/models/user";
import { getUserData } from "@/services/user-service";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: any;
  setUser: (user: any) => void;
};

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(token).then((user) => {
        if (user !== undefined) setUser(user);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
