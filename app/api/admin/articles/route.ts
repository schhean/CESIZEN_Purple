import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
      },
    });

    return NextResponse.json(newArticle);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/admin/articles
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce fichier définit les points de terminaison (endpoints) pour la gestion 
 * des articles dans l'interface d'administration via les Route Handlers de Next.js.
 * 
 * 🚀 MÉTHODES HTTP
 * 
 * 1. GET : Récupération globale
 *    - Action : Interroge la base de données pour lister tous les articles.
 *    - Tri : Les articles sont classés par `date_creation` du plus récent au plus ancien.
 *    - Retour : Un tableau JSON d'objets articles (200 OK) ou un message d'erreur (500).
 * 
 * 2. POST : Création d'article
 *    - Action : Reçoit les données JSON du client et crée une nouvelle entrée.
 *    - Champs requis (via body) : `titre`, `resume`, `contenu`, `est_publie`.
 *    - Retour : L'objet article nouvellement créé (200 OK) ou une erreur (500).
 * 
 * 🛠️ ARCHITECTURE & SÉCURITÉ
 * - Prisma : Utilisé comme ORM pour interagir avec la table `article`.
 * - NextResponse : Standard Next.js pour formater les réponses API.
 * - Gestion d'erreurs : Des blocs try/catch isolent les requêtes pour éviter 
 *   le plantage du serveur et renvoyer des statuts HTTP appropriés.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler est destiné à être utilisé dans un répertoire `route.ts` au sein 
 * de l'App Router (ex: `app/api/admin/articles/route.ts`).
 * ==============================================================================
 */