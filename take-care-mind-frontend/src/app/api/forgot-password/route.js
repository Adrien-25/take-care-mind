// src/app/api/forgot-password/route.js
import { getAuth } from "firebase/auth";
import app from "../../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(app);

export async function POST(req) {
  const { email } = await req.json(); // Récupérer le corps de la requête

  try {
    // Envoyer l'e-mail de réinitialisation
    await sendPasswordResetEmail(auth, email);
    return new Response(
      JSON.stringify({
        message: "Un e-mail de réinitialisation a été envoyé.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi de l'e-mail." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
