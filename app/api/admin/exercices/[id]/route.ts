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