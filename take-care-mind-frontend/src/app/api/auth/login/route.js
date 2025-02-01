// File: src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Logique pour vérifier l'utilisateur dans la base de données
    console.log(`Attempting login for: ${email}`);

    // Exemple d'authentification fictive (à remplacer par votre logique réelle)
    if (email === 'test@example.com' && password === 'password123') {
      const token = 'fake-jwt-token'; // Remplacez par la génération d'un vrai JWT
      return NextResponse.json({ message: 'Login successful', token });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
