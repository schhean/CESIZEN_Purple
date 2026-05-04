import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

/**
 * ==============================================================================
 * DOCUMENTATION : API Route Handler - /api/admin/exercices
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce point de terminaison (Route Handler) gère la création de nouveaux exercices 
 * de respiration dans la base de données. Il convertit les données entrantes 
 * pour garantir l'intégrité des types numériques requis par le schéma.
 * 
 * 🚀 MÉTHODE HTTP
 * 
 * POST : Création d'exercice
 * - Action : Réceptionne un objet JSON contenant les paramètres de l'exercice.
 * - Paramètres attendus dans le body :
 *    - nom_exercice (string) : Nom identifiant la technique.
 *    - description (string) : Instructions détaillées.
 *    - temps_inspiration (number/string) : Durée de l'inspiration en secondes.
 *    - temps_apnee (number/string) : Durée de la rétention en secondes.
 *    - temps_expiration (number/string) : Durée de l'expiration en secondes.
 * 
 * 🛠️ LOGIQUE DE TRAITEMENT
 * - Conversion de type : Utilise `Number()` pour s'assurer que les valeurs 
 *   temporelles sont stockées en tant qu'entiers ou flottants, évitant les 
 *   conflits de type Prisma si les données proviennent d'un formulaire HTML.
 * - Prisma : Utilisation du client pour insérer les données dans la table `exercice`.
 * 
 * 🔒 GESTION DES ERREURS
 * - Capture les échecs de parsing JSON ou les erreurs de contraintes de base 
 *   de données via un bloc try/catch.
 * - Retourne un statut HTTP 500 avec un message d'erreur explicite.
 * 
 * 📝 NOTE TECHNIQUE
 * Ce handler est conçu pour être placé dans `app/api/admin/exercices/route.ts`.
 * ==============================================================================
 */