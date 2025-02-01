import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log("JWT REQUEST");
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

        if (response.ok && data.token) {
          token.jwt = data.token; // Stocker le token JWT renvoyé par le backend
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.jwt; // Ajouter le token JWT à la session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // S'assurer que NextAuth utilise bien les JWT
  },
});
