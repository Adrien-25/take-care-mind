// File: src/app/api/auth/forgot-password/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Logique pour traiter la réinitialisation du mot de passe
    console.log(`Réinitialisation demandée pour : ${email}`);

    return NextResponse.json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
