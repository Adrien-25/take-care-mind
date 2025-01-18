import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Bienvenue sur Take Care Mind
        </h1>

        <p className="text-xl text-center text-gray-700 mb-12">
          Votre compagnon pour une vie plus équilibrée et épanouie.
        </p>

        <div className="flex justify-center space-x-4 mb-16">
          <Link
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Se connecter
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            S'inscrire
          </Link>
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Routine Matinale"
            description="Commencez vos journées du bon pied avec nos routines personnalisées."
          />
          <FeatureCard
            title="Méditation Guidée"
            description="Réduisez votre stress et améliorez votre concentration avec nos séances de méditation."
          />
          <FeatureCard
            title="Suivi des Objectifs"
            description="Définissez et atteignez vos objectifs personnels avec notre système de suivi intuitif."
          />
          <FeatureCard
            title="Exercices Physiques"
            description="Restez en forme avec nos programmes d'exercices adaptés à tous les niveaux."
          />
          <FeatureCard
            title="Gestion du Stress"
            description="Apprenez à gérer votre stress efficacement grâce à nos techniques éprouvées."
          />
          <FeatureCard
            title="Motivation Quotidienne"
            description="Recevez une dose quotidienne d'inspiration pour rester motivé."
          />
        </section>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// // src/pages/index.tsx
// "use client";

// import React, { useState } from "react";
// import AuthForm from "@/components/AuthForm";
// // import UserList from "./components/UserList";

// const HomePage = () => {
//   const [token, setToken] = useState(null);

//   return (
//     <div>
//       {!token ? (
//         <AuthForm onAuth={setToken} />
//       ) : (
//         <>
//           <h1>Welcome!</h1>
//           <button onClick={() => setToken(null)}>Logout</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;
