// src/pages/index.tsx
"use client";

import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
// import UserList from "./components/UserList"; // Si vous avez un composant pour afficher les utilisateurs

const HomePage = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <AuthForm onAuth={setToken} />
      ) : (
        <>
          <h1>Welcome!</h1>
          <button onClick={() => setToken(null)}>Logout</button>
        </>
      )}
    </div>
  );
};

export default HomePage;
