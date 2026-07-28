import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { emailConnexion, passwordConnexion } = body;

    if (!emailConnexion || !passwordConnexion) {
      return NextResponse.json(
        { message: "L'email et le mot de passe sont requis." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: emailConnexion },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Identifiants incorrects." },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      passwordConnexion,
      user.mot_de_passe,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Identifiants incorrects." },
        { status: 401 },
      );
    }

    if (!user.actif) {
      return NextResponse.json(
        { message: "Ce compte a été désactivé." },
        { status: 403 },
      );
    }

    const { mot_de_passe, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        success: true,
        message: "Connexion réussie.",
        user: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de l'connexion:", error);

    return NextResponse.json(
      { message: "Une erreur est survenue lors de la connexion." },
      { status: 500 },
    );
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/login (ou auth/login)
 * ==============================================================================
 *
 * 📌 DESCRIPTION
 * Ce point de terminaison gère la vérification des identifiants utilisateur pour
 * la connexion manuelle. Il valide l'email, compare le mot de passe et vérifie
 * l'état du compte avant d'autoriser l'accès.
 *
 * 🚀 MÉTHODE HTTP
 *
 * POST : Tentative de connexion
 * - Action : Reçoit les identifiants, les compare à la base de données et retourne
 *   les informations de l'utilisateur (sans le mot de passe).
 *
 * 🛠️ ÉTAPES DE VALIDATION
 * 1. Présence des données : Vérifie que l'email et le mot de passe sont envoyés (400).
 * 2. Existence : Recherche l'utilisateur par son email via Prisma (401 si absent).
 * 3. Sécurité (Bcrypt) : Compare le mot de passe en clair reçu avec le hash stocké (401 si invalide).
 * 4. État du compte : Vérifie la propriété `actif`. Si `false`, l'accès est refusé (403).
 *
 * 🔒 SÉCURITÉ ET PROTECTION
 * - Hashage : Utilise bcryptjs pour la comparaison sécurisée.
 * - Confidentialité : Utilise le "rest operator" (`...userWithoutPassword`) pour
 *   exclure explicitement le champ `mot_de_passe` de la réponse JSON envoyée au client.
 * - Messages d'erreur : Utilise des messages génériques ("Identifiants incorrects")
 *   pour ne pas indiquer si c'est l'email ou le mot de passe qui est faux (prévention contre l'énumération).
 *
 * 📝 NOTE TECHNIQUE
 * Ce handler est souvent utilisé comme alternative ou complément à NextAuth pour
 * des besoins spécifiques de vérification d'API personnalisée.
 * ==============================================================================
 */
