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
    }
  });

  if (!dbUser) {
    redirect("/");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Mon Compte</h1>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
        <p className="text-lg mb-6">
          Bienvenue sur votre espace, <span className="font-bold">{dbUser.prenom}</span> !
        </p>
        <ProfileForm user={dbUser} />
      </div>
    </div>
  );
}