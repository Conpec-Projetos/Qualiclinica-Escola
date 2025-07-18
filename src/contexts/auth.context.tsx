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

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isLoggedIn = !!currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setCurrentUser(userSnapshot.data() as User);
          setError(null);
        } else {
          setError("Dados do usuário não encontrados");
          setCurrentUser(undefined);
        }
      } else {
        setCurrentUser(undefined);
        setError(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setError("Erro ao fazer logout");
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
            setError("Usuário não encontrado");
            break;
          case "auth/wrong-password":
          case "auth/invalid-password":
          case "auth/invalid-credential":
            setError("Email ou senha inválidos");
            break;
          case "auth/invalid-email":
            setError("Email inválido");
            break;
          case "auth/user-disabled":
            setError("Usuário desabilitado");
            break;
          case "auth/too-many-requests":
            setError("Muitas tentativas de login. Tente novamente mais tarde");
            break;
          default:
            setError("Erro ao fazer login: " + err.message);
            break;
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
