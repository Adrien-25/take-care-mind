"use client";

// pages/dashboard.tsx
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  // console.log("Dashboard - Current user:", user);
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <p>Bienvenue, {user?.email}</p>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
