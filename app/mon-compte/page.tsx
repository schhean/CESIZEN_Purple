import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/compte/ProfileForm";

export default async function MonComptePage() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect("/");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id_utilisateur: true,
      nom: true,
      prenom: true,
      email: true,
      role: true,
    },
  });

  if (!dbUser) {
    redirect("/");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Mon Compte</h1>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
        <p className="text-lg mb-6">
          Bienvenue sur votre espace,{" "}
          <span className="font-bold">{dbUser.prenom}</span> !
        </p>
        <ProfileForm user={dbUser} />
      </div>
    </div>
  );
}

/**
 * ==============================================================================
 * DOCUMENTATION : Page Server Component - MonComptePage
 * ==============================================================================
 *
 * 📌 DESCRIPTION
 * Cette page constitue l'espace personnel de l'utilisateur. En tant que Server
 * Component, elle récupère les données de session et de base de données avant
 * le rendu pour garantir une sécurité maximale et des performances optimales.
 *
 * 🚀 LOGIQUE DE RENDU ET SÉCURITÉ
 *
 * 1. Authentification (Server-side) :
 *    - Appelle `getServerSession()` pour vérifier l'identité du visiteur.
 *    - Redirection immédiate vers la racine (`/`) via `redirect()` si aucune
 *      session valide n'est trouvée.
 *
 * 2. Récupération des données (Prisma) :
 *    - Requête l'utilisateur en base de données via son email unique issu du token.
 *    - Utilisation d'une clause `select` stricte : seules les données nécessaires
 *      à l'affichage et au formulaire sont extraites (excluant les hashs de MDP).
 *
 * 3. Validation d'intégrité :
 *    - Si la session existe mais que l'utilisateur n'est plus présent en base,
 *      une redirection de sécurité est opérée.
 *
 * 🎨 INTERFACE ET COMPOSANTS
 * - Mise en page : Utilise un container centré (`max-w-4xl mx-auto`) avec un
 *   support pour le mode sombre (`dark:bg-zinc-900`).
 * - ProfileForm : Composant Client (Child) auquel on passe les données de l'utilisateur
 *   en tant que props pour permettre l'édition interactive.
 *
 * 📝 NOTE TECHNIQUE
 * Étant un Server Component, cette page ne peut pas utiliser de hooks (useState, etc.).
 * Toute l'interactivité (modification des champs) est déportée dans le composant
 * `ProfileForm`.
 * ==============================================================================
 */
