import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface Props {
  children: React.ReactNode;
}

interface valueTypes {
  currentUser: firebase.default.User | null;
  logout: () => void;
}

const initialValues: valueTypes = {
  currentUser: null,
  logout: () => {},
};

const AuthContext = createContext(initialValues);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<firebase.default.User | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: valueTypes = {
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading && children}
    </AuthContext.Provider>
  );
};
