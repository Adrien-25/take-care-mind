// File: src/app/api/auth/signup/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Logique pour créer un nouvel utilisateur dans la base de données
    console.log(`Creating new user: ${email}`);

    // Exemple d'inscription fictive (à remplacer par votre logique réelle)
    const newUser = {
      id: 1, // ID fictif, remplacez par l'ID généré par la BDD
      email,
    };

    return NextResponse.json({
      message: 'Signup successful',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
