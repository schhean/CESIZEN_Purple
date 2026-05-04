import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const article = await prisma.article.findUnique({
      where: { 
        id_article: id,
        est_publie: true,
      },
      include: {
        auteur: {
          select: { nom: true, prenom: true }
        }
      }
    });

    if (!article) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur récupération article:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler (Public) - /api/articles/[id]
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce point de terminaison gère la récupération publique d'un article spécifique.
 * Contrairement aux routes admin, celle-ci intègre une sécurité native pour ne
 * servir que le contenu validé et publié.
 * 
 * 🚀 MÉTHODE HTTP
 * 
 * GET : Lecture d'un article unique
 * - Action : Recherche un article par son ID unique dans la base de données.
 * - Sécurité (Filtre) : La requête inclut la condition `est_publie: true`. Si un 
 *   article existe mais n'est pas publié, le serveur renverra une erreur 404.
 * - Enrichissement : Utilise la clause `include` pour joindre les données de 
 *   l'auteur (uniquement nom et prénom) afin d'afficher les crédits sur le blog.
 * 
 * 🛠️ ARCHITECTURE & LOGIQUE
 * - Params : Support de l'asynchronisme pour l'extraction de l'ID depuis l'URL.
 * - Parsing : Conversion de l'identifiant (string) en entier (`number`).
 * - Gestion du vide : Renvoie explicitement un statut 404 si l'article est 
 *   introuvable ou non autorisé à la lecture publique.
 * 
 * 🔒 GESTION DES ERREURS
 * - Capture les erreurs de connexion ou de requête via un bloc try/catch.
 * - Renvoie un statut 500 en cas de défaillance imprévue du serveur.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être situé dans `app/api/articles/[id]/route.ts`.
 * ==============================================================================
 */