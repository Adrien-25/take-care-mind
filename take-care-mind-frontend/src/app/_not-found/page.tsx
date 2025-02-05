import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        {`Page non trouvée`}
      </h2>
      <p className="text-gray-500 mb-8">
        {`Désolé, la page que vous recherchez n'existe pas.`}
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {`Retour à l'accueil`}
      </Link>
    </div>
  );
}
