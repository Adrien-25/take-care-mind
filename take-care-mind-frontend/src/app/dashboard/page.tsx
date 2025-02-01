"use client";

import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {/* <p>Bienvenue, {user?.email}</p> */}
      </main>
    </div>
  );
};

export default Dashboard;
