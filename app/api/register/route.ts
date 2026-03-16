import { prisma } from "../../../lib/prisma"; 
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, emailInscription, passwordInscription } = body;

        if (!firstName || !lastName || !emailInscription || !passwordInscription) {
            return NextResponse.json(
                { message: "Tous les champs sont requis." }, 
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: emailInscription },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Un utilisateur avec cet email existe déjà." }, 
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(passwordInscription, 10);

        await prisma.user.create({
            data: {
                nom: lastName,
                prenom: firstName,
                email: emailInscription,
                mot_de_passe: hashedPassword,
                actif: true,
            },
        });

        return NextResponse.json(
            { success: true, message: "Inscription réussie." }, 
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        return NextResponse.json(
            { message: "Une erreur est survenue lors de l'inscription." }, 
            { status: 500 }
        );
    }
}