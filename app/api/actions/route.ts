"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: FormData) {
    const prenom = data.get("firstName") as string;
    const nom = data.get("lastName") as string;
    const email = data.get("emailInscription") as string;
    const mot_de_passe = data.get("passwordInscription") as string;

    if (!prenom || !nom || !email || !mot_de_passe) {
        throw new Error("Tous les champs sont requis.");
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà.");
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        await prisma.user.create({
            data: {
                nom,
                prenom,
                email: email,
                mot_de_passe: hashedPassword,
                actif: true,
            },
        });

        return { success: true, message: "Inscription réussie." };
    } catch (error) {
        // J'ai corrigé l'espace ici !
        console.error("Erreur lors de l'inscription:", error);
        throw new Error("Une erreur est survenue lors de l'inscription.");
    }
}