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