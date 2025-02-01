"use client";

import Sidebar from "@/components/Sidebar";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const Dashboard = () => {
  // const { data: session } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     console.log("Session expirée, redirection...");
  //     router.push("/auth/login");
  //   }
  // }, [session, router]);

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
