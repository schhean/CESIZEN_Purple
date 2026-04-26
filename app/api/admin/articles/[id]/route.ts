import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// 1. Fonction pour METTRE À JOUR (Modifier le contenu ou le statut publié/brouillon)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();

    // On extrait les champs potentiellement envoyés
    const { titre, resume, contenu, est_publie } = body;

    const updatedArticle = await prisma.article.update({
      where: { id_article: id },
      data: {
        // On ne met à jour que les champs qui ont été envoyés
        ...(titre !== undefined && { titre }),
        ...(resume !== undefined && { resume }),
        ...(contenu !== undefined && { contenu }),
        ...(est_publie !== undefined && { est_publie }),
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
  }
}

// 2. Fonction pour SUPPRIMER (Celle que tu avais déjà)
export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.article.delete({
      where: { id_article: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}