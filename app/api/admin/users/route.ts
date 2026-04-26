import { NextResponse } from 'next/server';
// Assure-toi que le chemin vers ton client Prisma est correct (souvent dans lib/prisma.ts)
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // ⚠️ IMPORTANT : Ici, tu devrais vérifier que l'utilisateur qui fait la requête 
    // a bien le rôle ADMIN via ta session (ex: NextAuth, JWT, etc.)

    const users = await prisma.user.findMany({
      // On ne sélectionne pas le mot de passe pour des raisons de sécurité
      select: {
        id_utilisateur: true,
        nom: true,
        prenom: true,
        email: true,
        actif: true,
        role: true,
      },
      orderBy: {
        id_utilisateur: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}