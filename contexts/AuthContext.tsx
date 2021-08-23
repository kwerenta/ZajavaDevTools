import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface Props {
  children: React.ReactNode;
}

interface valueTypes {
  isLoading: boolean;
  currentUser: User | null;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  function logout() {
    router.replace("/login");
    return signOut(auth);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isLoading && !currentUser && router.pathname !== "/login")
      router.replace("/login");
  }, [currentUser, isLoading, router]);

  const value: valueTypes = {
    isLoading,
    currentUser,
    logout,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
