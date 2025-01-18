"use client";

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
      setCookie("token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7 jours
      router.push("/dashboard");
    } catch (error: any) {
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
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
    //   console.log("Google Sign In - Token:", token);
      setCookie("token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7 jours
      router.push("/dashboard");
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
        <form onSubmit={handleSubmitLogin}>
          <div className="relative w-full mx-auto flex justify-center gap-4 mb-8 bg-[#36373B] p-1 rounded-lg">
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-lg w-full bg-[#007bff]"
            >
              Se connecter
            </button>
            <Link className="w-full" href="/auth/signup" passHref>
              <button
                type="button"
                className="px-4 py-2 rounded-lg w-full text-white transition-colors duration-200"
              >
                S'inscrire
              </button>
            </Link>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mb-3">{errorMessage}</p>
          )}
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 my-4 border border-[#555] rounded-lg bg-[#333] text-white placeholder-[#aaa] focus:bg-[#333]"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="text-right  underline	text-sm mt-3">
            <a href="/forgot-password">Mot de passe oublié ?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-9 bg-[#007bff] text-white border-none rounded-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0056b3]"
          >
            Se connecter
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
            onClick={handleGoogleLogin}
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
            onClick={handleGoogleLogin}
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
            onClick={handleGoogleLogin}
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

export default LoginPage;