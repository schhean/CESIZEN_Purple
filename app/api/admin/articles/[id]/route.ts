import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();

    const { titre, resume, contenu, est_publie } = body;

    const updatedArticle = await prisma.article.update({
      where: { id_article: id },
      data: {
        ...(titre !== undefined && { titre }),
        ...(resume !== undefined && { resume }),
        ...(contenu !== undefined && { contenu }),
        ...(est_publie !== undefined && { est_publie }),
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la modification" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.article.delete({
      where: { id_article: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 },
    );
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler (Dynamique) - /api/admin/articles/[id]
 * ==============================================================================
 *
 * 📌 DESCRIPTION
 * Ce fichier gère les opérations spécifiques à un article unique identifié par
 * son ID. Il utilise les paramètres de route dynamiques de Next.js (params).
 *
 * 🚀 MÉTHODES HTTP
 *
 * 1. PATCH : Mise à jour partielle
 *    - Action : Modifie un article existant sans écraser les champs non fournis.
 *    - Logique : Utilise le spread operator conditionnel pour ne mettre à jour
 *      que les propriétés présentes dans le corps de la requête (titre, résumé,
 *      contenu, ou statut de publication).
 *    - Paramètres : Requiert l'ID dans l'URL et un JSON dans le body.
 *
 * 2. DELETE : Suppression définitive
 *    - Action : Supprime l'article correspondant à l'ID fourni de la base de données.
 *    - Retour : Un objet de succès `{ success: true }` (200 OK) ou une erreur (500).
 *
 * 🛠️ ARCHITECTURE & TYPES
 * - Params Asynchrones : Adapté aux versions récentes de Next.js où `params`
 *   doit être attendu (`await`).
 * - Prisma : Interface avec la table `article` via la clé primaire `id_article`.
 * - Parsing : Conversion systématique de l'ID (string) en `number` via `parseInt`.
 *
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être placé dans `app/api/admin/articles/[id]/route.ts`.
 * ==============================================================================
 */
