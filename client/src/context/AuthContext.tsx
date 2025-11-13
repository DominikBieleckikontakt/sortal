import { authClient } from "@/lib/authClient";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const session = await authClient.getSession();
      setUser(session?.data?.user ?? null);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
