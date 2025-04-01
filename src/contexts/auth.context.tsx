import { ReactNode, createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "../classes/User";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextData {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  currentUser: User | undefined;
  error: string | null;
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isLoggedIn = !!currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setCurrentUser(userSnapshot.data() as User);
        }
      } else {
        setCurrentUser(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(undefined);
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      const userRef = doc(db, "users", auth.currentUser?.uid || "");
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data() as User;
      setCurrentUser(userData);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/user-not-found") {
          setError("Usuário não encontrado");
        } else if (
          err.code === "auth/invalid-password" ||
          err.code === "auth/invalid-email"
        ) {
          setError("Email ou senha inválidos");
        } else {
          console.error(err.message);
        }
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading,
        currentUser,
        error,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
