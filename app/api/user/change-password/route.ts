import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { compare, hash } from "@/lib/bcrypt";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          message:
            "Le nouveau mot de passe ne peut pas être identique à l'ancien.",
        },
        { status: 400 },
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 },
      );
    }

    const isPasswordValid = await compare(currentPassword, dbUser.mot_de_passe);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Le mot de passe actuel est incorrect." },
        { status: 401 },
      );
    }
    const hashedNewPassword = await hash(newPassword);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { mot_de_passe: hashedNewPassword },
    });

    return NextResponse.json(
      { message: "Mot de passe mis à jour avec succès" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Erreur API PUT /user/change-password :", error);

    return NextResponse.json(
      { message: "Erreur serveur lors du changement de mot de passe." },
      { status: 500 },
    );
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/user/change-password
 * ==============================================================================
 *
 * 📌 DESCRIPTION
 * Ce point de terminaison gère la mise à jour sécurisée du mot de passe pour un
 * utilisateur authentifié. Il nécessite la validation de l'ancien mot de passe
 * avant d'autoriser l'enregistrement du nouveau.
 *
 * 🚀 MÉTHODE HTTP
 *
 * PUT : Mise à jour du mot de passe
 * - Action : Vérifie la session, compare le mot de passe actuel et hache le nouveau.
 *
 * 🛠️ ÉTAPES DE SÉCURITÉ ET VALIDATION
 * 1. Authentification (401) : Utilise `getServerSession` pour vérifier que
 *    l'utilisateur est connecté.
 * 2. Logique métier (400) : Interdit d'utiliser un nouveau mot de passe
 *    identique au précédent.
 * 3. Intégrité (404) : Vérifie que l'utilisateur de la session existe toujours
 *    en base de données.
 * 4. Validation du secret (401) : Utilise `compare` (bcrypt) pour vérifier que
 *    le `currentPassword` fourni correspond au hash stocké.
 * 5. Hachage : Le nouveau mot de passe est haché avant d'être persisté.
 *
 * 🔒 PROTECTION DES DONNÉES
 * - Utilisation de Prisma pour une mise à jour ciblée via l'email unique.
 * - Aucune donnée sensible n'est retournée dans la réponse JSON (uniquement
 *   un message de succès).
 *
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être situé dans `app/api/user/change-password/route.ts`.
 * Il s'appuie sur une bibliothèque utilitaire locale `@/lib/bcrypt` pour
 * l'abstraction des fonctions de hachage.
 * ==============================================================================
 */
