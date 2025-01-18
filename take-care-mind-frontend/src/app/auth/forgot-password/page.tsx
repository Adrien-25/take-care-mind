// pages/auth/forgot-password.js
"use client";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Envoyer une requête à votre API pour envoyer l'e-mail de réinitialisation
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("Un e-mail de réinitialisation a été envoyé.");
    } else {
      setMessage("Erreur lors de l'envoi de l'e-mail.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212]">
      <div className="w-[400px] max-w-[90%] mx-auto p-6 bg-[#444] rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Mot de passe oublié
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mt-4 border border-[#555] rounded-lg bg-[#333] text-white placeholder-[#aaa] focus:bg-[#333] focus:border-blue-500 focus:outline-none"
          />

          <div className="text-center my-6 underline	text-sm text-white">
            <a href="/">« Retour à la connexion</a>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
        {message && <p className="text-white text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
