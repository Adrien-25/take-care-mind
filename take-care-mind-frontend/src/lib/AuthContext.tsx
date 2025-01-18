"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getCookie, setCookie } from "cookies-next";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
});

const removeCookie = (key: string) => {
  setCookie(key, "", { maxAge: -1, path: "/" });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const token = await firebaseUser.getIdToken();
        setCookie("authToken", token, { maxAge: 60 * 60 * 24 * 7 }); // 7 jours
      } else {
        setUser(null);
        removeCookie("authToken");
      }
      setLoading(false);
    });

    const token = getCookie("authToken");

    if (typeof token === "string" && !user) {
      setLoading(true);
      auth.onIdTokenChanged(async (user) => {
        if (user) {
          const newToken = await user.getIdToken();
          setCookie("authToken", newToken, { maxAge: 60 * 60 * 24 * 7 });
          setUser(user);
        } else {
          removeCookie("authToken");
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
