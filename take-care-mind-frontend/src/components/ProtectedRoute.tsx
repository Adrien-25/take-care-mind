// components/ProtectedRoute.tsx
import { useAuth } from "@/lib/AuthContext";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const authToken = getCookie("authToken");

  useEffect(() => {
    if (!user && !authToken) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
