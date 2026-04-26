import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// Créer un nouvel exercice
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom_exercice, description, temps_inspiration, temps_apnee, temps_expiration } = body;

    const newExercice = await prisma.exercice.create({
      data: {
        nom_exercice,
        description,
        temps_inspiration: Number(temps_inspiration),
        temps_apnee: Number(temps_apnee),
        temps_expiration: Number(temps_expiration),
      },
    });

    return NextResponse.json(newExercice);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}