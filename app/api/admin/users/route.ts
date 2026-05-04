import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
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

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/admin/users
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce point de terminaison (Route Handler) permet de récupérer la liste complète
 * des utilisateurs enregistrés dans la base de données pour l'interface d'administration.
 * 
 * 🚀 MÉTHODE HTTP
 * 
 * GET : Récupération des utilisateurs
 * - Action : Interroge la table `user` via Prisma.
 * - Sécurité des données : Utilise une clause `select` stricte pour exclure 
 *   le champ `mot_de_passe` (hash) et ne retourner que les informations non sensibles.
 * - Tri : Les résultats sont classés par `id_utilisateur` par ordre décroissant 
 *   (les plus récents en premier).
 * 
 * 🛠️ ARCHITECTURE
 * - Prisma : ORM utilisé pour la communication avec la base de données.
 * - NextResponse : Utilisé pour formater et renvoyer les données au format JSON.
 * 
 * 🔒 GESTION DES ERREURS
 * - Capture toute défaillance de la base de données ou du serveur via un bloc try/catch.
 * - Log l'erreur exacte dans la console serveur pour le débogage.
 * - Renvoie une réponse JSON standardisée avec un code d'état 500.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler est conçu pour être placé dans `app/api/admin/users/route.ts`.
 * Dans un environnement de production, cette route doit être protégée par un 
 * middleware ou une vérification de session pour restreindre l'accès aux administrateurs.
 * ==============================================================================
 */