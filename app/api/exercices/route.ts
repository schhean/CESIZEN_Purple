
import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma'; 

const prisma = new PrismaClient();

export async function GET() {
  try {

    const exercices = await prisma.exercice.findMany();

    return NextResponse.json(exercices, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" }, 
      { status: 500 }
    );
  }
}