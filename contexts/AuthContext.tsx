import { createContext, useContext, useEffect, useState } from "react";
import { auth, authProviders } from "../firebase";

interface Props {
  children: React.ReactNode;
}

interface valueTypes {
  isLoading: boolean;
  currentUser: firebase.default.User | null;
  logout: () => void;
  loginWithGoogle: () => void;
}

const initialValues: valueTypes = {
  isLoading: true,
  currentUser: null,
  logout: () => {},
  loginWithGoogle: () => {},
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

  function loginWithGoogle() {
    return auth.signInWithPopup(authProviders.google);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: valueTypes = {
    isLoading,
    currentUser,
    logout,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};