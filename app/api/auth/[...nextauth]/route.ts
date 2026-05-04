import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("L'email et le mot de passe sont requis.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Identifiants incorrects.");

        const isPasswordValid = await bcrypt.compare(credentials.password, user.mot_de_passe);
        if (!isPasswordValid) throw new Error("Identifiants incorrects.");

        if (!user.actif) throw new Error("Ce compte a été désactivé.");

        return { 
            id: user.id_utilisateur.toString(), 
            name: `${user.prenom} ${user.nom}`, 
            email: user.email,
            role: user.role 
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/', 
  }
});

export { handler as GET, handler as POST };

/**
 * ==============================================================================
 * DOCUMENTATION : Configuration NextAuth - /api/auth/[...nextauth]
 * ==============================================================================
 * 
 * 📌 DESCRIPTION
 * Ce fichier est le cœur du système d'authentification de l'application. Il utilise 
 * NextAuth pour gérer les sessions utilisateurs via une stratégie de jetons JWT 
 * et un fournisseur d'identifiants personnalisés (Credentials Provider).
 * 
 * 🚀 MÉTHODES ET LOGIQUE
 * 
 * 1. Provider Credentials :
 *    - Extrait l'email et le mot de passe de la requête.
 *    - Valide l'existence de l'utilisateur dans la base via Prisma.
 *    - Compare le mot de passe haché avec bcrypt.
 *    - Sécurité : Vérifie si le compte est marqué comme `actif`. Si `false`, 
 *      l'accès est refusé.
 *    - Retourne un objet utilisateur enrichi du `role`.
 * 
 * 2. Stratégie de Session :
 *    - Utilise `strategy: "jwt"`, ce qui signifie que les données de session 
 *      sont stockées dans un cookie chiffré côté client, et non en base de données.
 * 
 * 3. Callbacks (Cycle de vie) :
 *    - jwt() : S'exécute lors de la création ou mise à jour du token. C'est ici 
 *      que l'on injecte le `role` de l'utilisateur dans le payload du JWT.
 *    - session() : Permet de rendre le `role` accessible côté client via le hook 
 *      `useSession()` ou la fonction `getServerSession()`.
 * 
 * 🛠️ CONFIGURATION DES PAGES
 * - La page de connexion par défaut est redirigée vers la racine (`/`).
 * 
 * 📝 NOTE TECHNIQUE
 * L'export `handler as GET, handler as POST` permet à Next.js de gérer les 
 * requêtes d'authentification sur les deux verbes HTTP nécessaires au protocole.
 * ==============================================================================
 */