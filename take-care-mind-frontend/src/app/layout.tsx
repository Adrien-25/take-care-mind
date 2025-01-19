import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "Take Care Mind",
  description: "Deviens la meilleur version de toi-même",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <AuthProvider>
        <body className={` antialiased bg-gray-900 text-white`}>{children}</body>
      </AuthProvider>
    </html>
  );
}
