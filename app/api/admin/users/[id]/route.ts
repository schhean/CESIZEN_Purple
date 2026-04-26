import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Route pour MODIFIER (Désactiver/Activer)
export async function PATCH(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // 1. On type params comme une Promise
) {
  try {
    const resolvedParams = await params; // 2. On attend (await) la résolution des paramètres
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

// Route pour SUPPRIMER
export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // 1. On type params comme une Promise
) {
  try {
    const resolvedParams = await params; // 2. On attend (await) la résolution des paramètres
    const id = parseInt(resolvedParams.id);

    await prisma.user.delete({
      where: { id_utilisateur: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}