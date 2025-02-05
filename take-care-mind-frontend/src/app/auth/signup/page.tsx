"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("signup", {
      redirect: false,
      email,
      password,
    });
    console.log(res);

    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      router.push("/auth/login");
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Début de la création de compte avec Google...");

    try {
      await signIn("google", {
        callbackUrl: "http://localhost:3000/dashboard",
      });
    } catch (error) {
      console.error("Erreur inattendue lors de la connexion Google:", error);
      // alert("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212]">
      <div className="text-sm w-[400px] max-w-[90%] mx-auto p-5 border border-[#444] rounded-lg shadow-lg bg-[#222] text-white">
        <h2 className="text-center mb-6 text-2xl">Bienvenue</h2>
        <form onSubmit={handleSubmitSignup}>
          <div className="relative w-full mx-auto flex justify-center gap-4 mb-8 bg-[#36373B] p-1 rounded-lg">
            <Link className="w-full" href="/auth/login" passHref>
              <button type="button" className="px-4 py-2 rounded-lg w-full ">
                Se connecter
              </button>
            </Link>

            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-lg w-full bg-[#007bff]"
            >
              {"S'inscrire"}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
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
          <button
            type="submit"
            className="w-full py-2.5 mt-9 bg-[#007bff] text-white border-none rounded-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0056b3]"
          >
            {"S'inscrire"}
          </button>
        </form>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="px-4 font-bold text-sm text-gray-300">OU</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        {/* <div className="font-bold text-sm text-center my-6">
          OU
        </div> */}
        <div className="flex items-center justify-evenly mb-5">
          <button
            type="button"
            className="bg-white text-[#333] border border-[#ccc] rounded-md flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0] px-4 py-2.5 w-full"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/images/google_icon.svg"
              alt="Google Icon"
              className="h-[20px] mr-2" // Réduction de la taille de l'icône et ajout de marge à droite
              width={20}
              height={20}
            />
            <span>Se connecter avec Google</span> {/* Ajout du texte */}
          </button>
          {/* BOUTON GOOGLE */}
          {/* <button
            type="button"
            className="w-[60px] h-[60px] bg-white text-[#333] border border-[#ccc] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0]" // Utilisez la nouvelle classe pour le bouton Google
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/images/google_icon.svg"
              alt="Google Icon"
              className="h-[35px]"
              width={100}
              height={100}
            />
          </button> */}
          {/* BOUTON APPLE */}
          {/* <button
            type="button"
            className="w-[60px] h-[60px] bg-white text-[#333] border border-[#ccc] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0]" // Utilisez la nouvelle classe pour le bouton Google
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/images/apple_icon.svg"
              alt="Apple Icon"
              className="h-[30px]"
              width={100}
              height={100}
            />
          </button> */}
          {/* BOUTON FACEBOOK */}
          {/* <button
            type="button"
            className="w-[60px] h-[60px] bg-white text-[#333] border border-[#ccc] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0]" // Utilisez la nouvelle classe pour le bouton Google
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/images/facebook_icon.svg"
              alt="Facebook Icon"
              className="h-[30px]"
              width={100}
              height={100}
            />
          </button> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
