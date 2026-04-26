import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// Récupérer tous les articles
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { date_creation: 'desc' },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

// Créer un nouvel article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titre, resume, contenu, est_publie } = body;

    const newArticle = await prisma.article.create({
      data: {
        titre,
        resume,
        contenu,
        est_publie,
        // auteur_id: 1 // Tu pourras décommenter et lier ça à l'ID de l'admin connecté plus tard
      },
    });

    return NextResponse.json(newArticle);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}