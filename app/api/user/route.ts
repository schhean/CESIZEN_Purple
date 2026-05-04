import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma"; 

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { nom, prenom, email } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email, 
      },
      data: {
        nom,
        prenom,
        email, 
      },
    });

    return NextResponse.json({ message: "Profil mis à jour avec succès", user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur API PUT /user :", error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "Cette adresse email est déjà utilisée par un autre compte." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Erreur serveur lors de la mise à jour." }, { status: 500 });
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/user (Mise à jour profil)
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce point de terminaison permet à un utilisateur authentifié de modifier ses 
 * informations personnelles (nom, prénom et adresse email).
 * 
 * 🚀 MÉTHODE HTTP
 * 
 * PUT : Mise à jour des informations utilisateur
 * - Action : Identifie l'utilisateur via sa session active et met à jour ses 
 *   données dans la base.
 * 
 * 🛠️ LOGIQUE DE TRAITEMENT ET SÉCURITÉ
 * 1. Vérification de Session (401) : Utilise `getServerSession` pour garantir 
 *    que seul le propriétaire du compte peut initier la modification.
 * 2. Identification : La recherche dans la base de données s'appuie sur l'email 
 *    stocké dans la session sécurisée (`session.user.email`).
 * 3. Persistance : Met à jour les champs `nom`, `prenom` et `email` via Prisma.
 * 
 * 🔒 GESTION DES ERREURS SPÉCIFIQUES
 * - Conflit d'email (409) : Capture l'erreur Prisma `P2002` (contrainte d'unicité). 
 *   Si l'utilisateur tente de changer son email pour un autre déjà existant en 
 *   base, la requête est rejetée avec un message explicite.
 * - Erreur Serveur (500) : Capture les autres exceptions techniques et renvoie 
 *   un message générique.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être placé dans `app/api/user/route.ts`. 
 * Attention : Si l'email est modifié, il est possible que l'utilisateur doive 
 * se reconnecter ou que le token de session doive être rafraîchi selon votre 
 * configuration NextAuth.
 * ==============================================================================
 */