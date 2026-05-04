import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    const body = await request.json();
    const { actif } = body;

    const updatedUser = await prisma.user.update({
      where: { id_utilisateur: id },
      data: { actif },
      select: { id_utilisateur: true, actif: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.user.delete({
      where: { id_utilisateur: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler (Dynamique) - /api/admin/users/[id]
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce fichier gère les actions administratives ciblées sur un utilisateur spécifique
 * via son identifiant unique. Il permet la modification du statut et la suppression.
 * 
 * 🚀 MÉTHODES HTTP
 * 
 * 1. PATCH : Mise à jour du statut
 *    - Action : Permet d'activer ou de désactiver (bannir temporairement) un compte.
 *    - Entrée : Un objet JSON `{ actif: boolean }`.
 *    - Sécurité : Utilise la clause `select` pour ne renvoyer que les données 
 *      essentielles (ID et statut), évitant la fuite accidentelle de hashs de mots de passe.
 * 
 * 2. DELETE : Suppression de compte
 *    - Action : Supprime définitivement l'utilisateur de la base de données.
 *    - Paramètre : L'ID extrait de l'URL dynamique.
 *    - Retour : Un objet de confirmation `{ success: true }`.
 * 
 * 🛠️ ARCHITECTURE & TYPES
 * - Params : Conformément aux évolutions récentes de Next.js, `params` est traité 
 *   comme une `Promise` et résolu via `await` pour accéder à l'ID.
 * - Prisma : Interface avec le modèle `user` en utilisant `id_utilisateur`.
 * - Parsing : Conversion de l'identifiant de type `string` vers `number`.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être implémenté dans le répertoire `app/api/admin/users/[id]/route.ts`.
 * ==============================================================================
 */