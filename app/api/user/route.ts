import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma"; 

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { nom, prenom, email } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email, 
      },
      data: {
        nom,
        prenom,
        email, 
      },
    });

    return NextResponse.json({ message: "Profil mis à jour avec succès", user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur API PUT /user :", error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "Cette adresse email est déjà utilisée par un autre compte." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Erreur serveur lors de la mise à jour." }, { status: 500 });
  }
}