import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, emailInscription, passwordInscription } = body;

    if (!firstName || !lastName || !emailInscription || !passwordInscription) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: emailInscription },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Un utilisateur avec cet email existe déjà." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(passwordInscription, 10);

    await prisma.user.create({
      data: {
        nom: lastName,
        prenom: firstName,
        email: emailInscription,
        mot_de_passe: hashedPassword,
        actif: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Inscription réussie." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);

    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription." },
      { status: 500 },
    );
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/register (ou auth/register)
 * ==============================================================================
 *
 * 📌 DESCRIPTION
 * Ce point de terminaison gère la création de nouveaux comptes utilisateurs.
 * Il assure la validation des données, vérifie l'unicité de l'identifiant et
 * sécurise le stockage des informations sensibles.
 *
 * 🚀 MÉTHODE HTTP
 *
 * POST : Création d'un utilisateur
 * - Action : Reçoit les informations d'inscription, les valide, hache le mot de
 *   passe et enregistre le nouvel utilisateur dans la base de données.
 *
 * 🛠️ LOGIQUE DE TRAITEMENT ET STATUTS
 * 1. Validation (400) : Vérifie que tous les champs obligatoires (firstName,
 *    lastName, email, password) sont présents dans le corps de la requête.
 * 2. Vérification d'existence (409) : Interroge la base de données pour s'assurer
 *    que l'email n'est pas déjà associé à un compte existant.
 * 3. Sécurisation : Utilise bcryptjs pour hacher le mot de passe avec un "salt
 *    round" de 10 avant toute insertion.
 * 4. Création (201) : Insère les données dans la table `user` via Prisma.
 *
 * 🔒 SÉCURITÉ
 * - Protection des mots de passe : Le mot de passe en clair n'atteint jamais
 *   la base de données.
 * - Gestion d'erreurs (500) : Capture les exceptions imprévues et renvoie un
 *   message d'erreur générique tout en loguant le détail côté serveur.
 *
 * 📝 NOTE TECHNIQUE
 * Ce handler est conçu pour fonctionner avec l'App Router de Next.js. Les noms
 * de champs (`firstName`, `lastName`) sont mappés vers les colonnes Prisma
 * correspondantes (`prenom`, `nom`).
 * ==============================================================================
 */
