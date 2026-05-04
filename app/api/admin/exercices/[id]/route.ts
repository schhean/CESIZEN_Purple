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

        const { nom_exercice, description, temps_inspiration, temps_apnee, temps_expiration } = body;

        const updatedExercice = await prisma.exercice.update({
            where: { id_exercice: id },
            data: {
                ...(nom_exercice !== undefined && { nom_exercice }),
                ...(description !== undefined && { description }),
                ...(temps_inspiration !== undefined && { temps_inspiration: Number(temps_inspiration) }),
                ...(temps_apnee !== undefined && { temps_apnee: Number(temps_apnee) }),
                ...(temps_expiration !== undefined && { temps_expiration: Number(temps_expiration) }),
            },
        });

        return NextResponse.json(updatedExercice);
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);

        await prisma.exercice.delete({
            where: { id_exercice: id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
}

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler (Dynamique) - /api/admin/exercices/[id]
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce fichier gère les actions spécifiques à un exercice de respiration unique via
 * son identifiant dynamique. Il permet la mise à jour partielle et la suppression.
 * 
 * 🚀 MÉTHODES HTTP
 * 
 * 1. PATCH : Mise à jour ciblée
 *    - Action : Modifie les propriétés d'un exercice existant.
 *    - Flexibilité : Utilise l'opérateur de décomposition (spread) conditionnel
 *      pour ne mettre à jour que les champs fournis dans le corps de la requête.
 *    - Conversion : Force la conversion des durées (inspiration, apnée, expiration)
 *      en type `Number` pour garantir la compatibilité avec le schéma de la base.
 * 
 * 2. DELETE : Suppression
 *    - Action : Retire définitivement l'exercice de la base de données.
 *    - Retour : Un objet `{ success: true }` en cas de réussite.
 * 
 * 🛠️ DÉTAILS TECHNIQUES
 * - Params : Support de l'asynchronisme pour les paramètres de route (`Promise`).
 * - Prisma : Utilisation de la table `exercice` avec filtrage sur `id_exercice`.
 * - Sécurité : Gestion des erreurs via try/catch renvoyant un statut 500 explicite.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler doit être situé dans `app/api/admin/exercices/[id]/route.ts`.
 * ==============================================================================
 */