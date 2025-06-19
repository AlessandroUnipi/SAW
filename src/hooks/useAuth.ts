// src/hooks/useAuth.ts
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Tipo del valore condiviso
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Contesto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato
export const useAuth = () => useContext(AuthContext);
