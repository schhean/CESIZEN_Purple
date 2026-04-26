import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
  try {
    // On ne récupère QUE les articles où est_publie est "true"
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
        // On peut exclure le contenu complet ici pour que la page charge plus vite
      }
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}