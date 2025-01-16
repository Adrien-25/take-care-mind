import type { Metadata } from "next";
import "./globals.css";

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
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
