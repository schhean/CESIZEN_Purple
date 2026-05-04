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
        console.error("Erreur lors de l'inscription:", error);
        throw new Error("Une erreur est survenue lors de l'inscription.");
    }
}

/**
 * ==============================================================================
 * DOCUMENTATION : Server Action - registerUser
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Cette fonction est une "Server Action" Next.js qui gère la logique de création
 * de compte utilisateur côté serveur. Elle assure la validation, la sécurité 
 * (hachage) et la persistance des données.
 * 
 * 🛠️ FLUX DE TRAVAIL
 * 1. Extraction : Récupère les données brutes du FormData (firstName, lastName, 
 *    emailInscription, passwordInscription).
 * 2. Validation : Vérifie que tous les champs obligatoires sont présents.
 * 3. Unicité : Interroge la base de données via Prisma pour s'assurer que 
 *    l'email n'est pas déjà utilisé.
 * 4. Sécurité : Hache le mot de passe en utilisant bcryptjs avec un sel de 10 tours
 *    pour éviter de stocker des mots de passe en clair.
 * 5. Persistance : Crée l'entrée dans la table `user` avec le statut `actif: true`.
 * 
 * 🔒 SÉCURITÉ
 * - S'exécute exclusivement côté serveur ("use server").
 * - Utilisation de bcryptjs pour la protection des identifiants.
 * - Protection contre les collisions d'emails.
 * 
 * 🚀 RETOURS & ERREURS
 * - Succès : Retourne un objet `{ success: true, message: string }`.
 * - Échec : Lève une `Error` explicite qui peut être capturée par un bloc 
 *   try/catch dans le composant client ou un fichier error.tsx.
 * 
 * 📦 DÉPENDANCES
 * - Prisma : ORM pour la communication avec la base de données.
 * - Bcryptjs : Bibliothèque de hachage de mots de passe.
 * ==============================================================================
 */