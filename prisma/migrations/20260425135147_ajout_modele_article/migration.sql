-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id_utilisateur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Exercice" (
    "id_exercice" SERIAL NOT NULL,
    "nom_exercice" TEXT NOT NULL,
    "temps_inspiration" INTEGER NOT NULL,
    "temps_apnee" INTEGER NOT NULL,
    "temps_expiration" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Exercice_pkey" PRIMARY KEY ("id_exercice")
);

-- CreateTable
CREATE TABLE "Article" (
    "id_article" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "resume" TEXT,
    "contenu" TEXT NOT NULL,
    "image_url" TEXT,
    "est_publie" BOOLEAN NOT NULL DEFAULT false,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_mise_a_jour" TIMESTAMP(3) NOT NULL,
    "auteur_id" INTEGER,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id_article")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_auteur_id_fkey" FOREIGN KEY ("auteur_id") REFERENCES "User"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
