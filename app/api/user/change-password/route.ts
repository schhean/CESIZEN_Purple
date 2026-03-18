import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "@/lib/bcrypt";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { message: "Le nouveau mot de passe ne peut pas être identique à l'ancien." }, 
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
        return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    const isPasswordValid = await compare(currentPassword, dbUser.mot_de_passe);
    if (!isPasswordValid) {
        return NextResponse.json({ message: "Le mot de passe actuel est incorrect." }, { status: 401 });
    }
    const hashedNewPassword = await hash(newPassword);

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { mot_de_passe: hashedNewPassword },
    });

    return NextResponse.json({ message: "Mot de passe mis à jour avec succès" }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur API PUT /user/change-password :", error);
    return NextResponse.json({ message: "Erreur serveur lors du changement de mot de passe." }, { status: 500 });
  }
}