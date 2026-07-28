import { NextResponse } from "next/server";

import { PrismaClient } from "../../../lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const exercices = await prisma.exercice.findMany();

    return NextResponse.json(exercices, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices:", error);

    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 },
    );
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler (Public) - /api/exercices
 * ==============================================================================
 *
 * 📌 DESCRIPTION
 * Ce point de terminaison permet de récupérer l'intégralité des exercices de
 * respiration disponibles dans la base de données. Il est utilisé pour alimenter
 * le catalogue d'exercices côté client.
 *
 * 🚀 MÉTHODE HTTP
 *
 * GET : Liste des exercices
 * - Action : Effectue une requête globale sur la table `exercice`.
 * - Retour : Un tableau d'objets JSON contenant les détails de chaque exercice
 *   (nom, durées d'inspiration, d'apnée, d'expiration et description) avec
 *   un code de succès 200.
 *
 * 🛠️ ARCHITECTURE
 * - Prisma Client : Instancié localement pour interagir avec le schéma généré.
 * - NextResponse : Standard Next.js pour renvoyer les données structurées.
 *
 * 🔒 GESTION DES ERREURS
 * - Bloc try/catch : Intercepte les éventuels problèmes de connexion à la base
 *   de données ou les erreurs de lecture.
 * - Logging : En cas d'échec, l'erreur est enregistrée dans les logs serveur
 *   pour faciliter le diagnostic.
 * - Réponse : Renvoie un statut HTTP 500 avec un message d'erreur simplifié
 *   pour l'utilisateur final.
 *
 * 📝 NOTE TECHNIQUE
 * Ce handler est généralement situé dans `app/api/exercices/route.ts`.
 * Contrairement aux routes admin, cette route est ici ouverte à la lecture publique.
 * ==============================================================================
 */
