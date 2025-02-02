import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // name: "Credentials",
      id: "login",
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        console.log("Credentiels request login :");
        console.log(res);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Une erreur est survenue");
        }

        
        const user = await res.json();
        if (!user) {
          throw new Error("Identifiants incorrects");
        }
        if (res.ok && user) {
          return user;
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Signup",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentiels request signup");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user; // Retourne l'utilisateur si l'inscription réussit
        }

        throw new Error(user.message || "Failed to create account");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT CALLBACK TRIGGERED");

      if (account) {
        if (account.provider === "google") {
          console.log("Connexion via Google détectée.");

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                googleId: account.providerAccountId, // ID Google
                email: token.email, // E-mail de l'utilisateur
                name: token.name, // Nom de l'utilisateur
              }),
            }
          );
          const data = await response.json();
          token.provider = "google";
          if (response.ok && data.token) {
            token.email = data.email; // Ajoutez l'email au token
            token.name = data.name;
            token.accessToken = user?.token;

            // token.jwt = data.token; // Stocker le token JWT renvoyé par le backend
          }
        } else if (account.provider === "login") {
          console.log("Connexion via Login détectée.");
          token.provider = "login";
          token.email = user?.email;
          token.accessToken = user?.token || null;
          // token.jwt = user?.accessToken;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { email: token.email, name: token.name }; // Ajoutez uniquement les propriétés nécessaires
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Page personnalisée pour la connexion
  },
  session: {
    strategy: "jwt", // S'assurer que NextAuth utilise bien les JWT
  },
});
