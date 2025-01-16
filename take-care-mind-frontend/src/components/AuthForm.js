// src/components/AuthForm.js
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
// import styles from "./AuthForm.module.css";

const AuthForm = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // CONNEXION
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (!userCredential.user.emailVerified) {
          toast.error(
            "Veuillez vérifier votre adresse e-mail avant de vous connecter."
          );
          return;
        }
        const token = await userCredential.user.getIdToken();
        onAuth(token);
      } else {
        // INSCRIPTION
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // await createUserWithEmailAndPassword(auth, email, password);

        // Envoyer l'e-mail de vérification
        await sendEmailVerification(userCredential.user);
        toast.success(
          "Inscription réussie ! Vous pouvez maintenant vous connecter."
        );
        setIsLogin(true);
      }
    } catch (error) {
      // Gérer les erreurs ici
      console.error("Erreur de connexion:", error);
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("L'adresse e-mail est invalide.");
          break;
        case "auth/user-disabled":
          setErrorMessage("Ce compte a été désactivé.");
          break;
        case "auth/user-not-found":
          setErrorMessage("Aucun utilisateur trouvé avec cet e-mail.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Le mot de passe est incorrect.");
          break;
        case "auth/invalid-credential":
          setErrorMessage("Identifiant ou mot de passe invalide.");
          break;
        default:
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error(error);
      // toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      onAuth(token); // Passer le token au parent
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la connexion avec Google. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212]">
      <div className="w-[400px] max-w-[90%] mx-auto p-5 border border-[#444] rounded-lg shadow-lg bg-[#222] text-white">
        <h2 className="text-center mb-6 text-2xl">Bienvenue</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative w-full mx-auto flex justify-center gap-4 mb-8 bg-[#36373B] p-1 rounded-lg">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg w-full ${
                isLogin ? "bg-[#007bff]" : ""
              }`}
              onClick={() => setIsLogin(true)}
            >
              Se connecter
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg w-full text-white ${
                !isLogin ? "bg-[#007bff]" : ""
              }`}
              onClick={() => setIsLogin(false)}
            >
              S'inscrire
            </button>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 my-4 border border-[#555] rounded-lg bg-[#333] text-white placeholder-[#aaa] focus:bg-[#333]"
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 my-4 border border-[#555] rounded-lg bg-[#333] text-white placeholder-[#aaa] focus:bg-[#333]"
            autoComplete="new-password"
          />
          {isLogin && (
            <div className="text-right  underline	text-sm mt-3">
              <a href="/forgot-password">Mot de passe oublié ?</a>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2.5 mt-9 bg-[#007bff] text-white border-none rounded-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0056b3]"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
        <div className="font-bold text-sm text-center my-6">
          ou se connecter avec
        </div>
        <div className="flex items-center justify-evenly mb-5">
          {/* BOUTON GOOGLE */}
          <button
            type="button"
            className="w-[60px] h-[60px] bg-white text-[#333] border border-[#ccc] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0]" // Utilisez la nouvelle classe pour le bouton Google
            onClick={handleGoogleSignIn}
          >
            <img
              src="/images/google_icon.svg"
              alt="Google Icon"
              className="h-[35px]"
            />
          </button>
          {/* BOUTON APPLE */}
          <button
            type="button"
            className="w-[60px] h-[60px] bg-white text-[#333] border border-[#ccc] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0]" // Utilisez la nouvelle classe pour le bouton Google
            onClick={handleGoogleSignIn}
          >
            <img
              src="/images/apple_icon.svg"
              alt="Apple Icon"
              className="h-[30px]"
            />
          </button>
          {/* BOUTON FACEBOOK */}
          <button
            type="button"
            className="w-[60px] h-[60px] bg-white text-[#333] border border-[#ccc] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0]" // Utilisez la nouvelle classe pour le bouton Google
            onClick={handleGoogleSignIn}
          >
            <img
              src="/images/facebook_icon.svg"
              alt="Facebook Icon"
              className="h-[30px]"
            />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
