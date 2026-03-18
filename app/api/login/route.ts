import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { emailConnexion, passwordConnexion } = body;

        if (!emailConnexion || !passwordConnexion) {
            return NextResponse.json(
                { message: "L'email et le mot de passe sont requis." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: emailConnexion },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Identifiants incorrects." },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(passwordConnexion, user.mot_de_passe);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Identifiants incorrects." },
                { status: 401 }
            );
        }

        if (!user.actif) {
            return NextResponse.json(
                { message: "Ce compte a été désactivé." },
                { status: 403 }
            );
        }

        const { mot_de_passe, ...userWithoutPassword } = user;

        return NextResponse.json(
            {
                success: true,
                message: "Connexion réussie.",
                user: userWithoutPassword 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la connexion." },
            { status: 500 }
        );
    }
}