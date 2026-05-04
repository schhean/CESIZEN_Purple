import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        est_publie: true,
      },
      orderBy: {
        date_creation: 'desc',
      },
      select: {
        id_article: true,
        titre: true,
        resume: true,
        date_creation: true,
      }
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler (Public) - /api/articles
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce point de terminaison permet de récupérer la liste des articles destinés à être 
 * affichés publiquement sur le blog. Il est optimisé pour la performance et la sécurité.
 * 
 * 🚀 MÉTHODE HTTP
 * 
 * GET : Liste des articles publics
 * - Action : Interroge la table `article` pour extraire les publications validées.
 * - Filtre de sécurité : Seuls les articles possédant la propriété `est_publie: true` 
 *   sont retournés. Cela empêche l'exposition des brouillons en cours de rédaction.
 * - Tri : Les résultats sont ordonnés par `date_creation` du plus récent au plus ancien.
 * 
 * 🛠️ OPTIMISATION (Performance)
 * - Sélection partielle : La clause `select` exclut volontairement le champ `contenu`. 
 *   Cela permet d'alléger considérablement le poids de la réponse JSON, particulièrement 
 *   utile pour une page de liste (index) où seuls les titres et résumés sont nécessaires.
 * 
 * 🔒 GESTION DES ERREURS
 * - En cas de défaillance de la base de données, un statut HTTP 500 est renvoyé avec 
 *   un message générique pour ne pas exposer de détails techniques du serveur.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être placé dans le fichier `app/api/articles/route.ts`.
 * ==============================================================================
 */