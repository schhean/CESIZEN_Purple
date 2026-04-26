import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

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
        est_publie: true, // Sécurité : on ne renvoie que s'il est publié
      },
      // On inclut l'auteur pour pouvoir afficher son nom (optionnel mais sympa)
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