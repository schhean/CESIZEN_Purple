# Base de données hébergée de CESIZen

## Solution retenue

Neon est utilisé pour héberger la base PostgreSQL de l’environnement de
recette de CESIZen.

## Environnements

- Développement : PostgreSQL local.
- Recette : PostgreSQL hébergé sur Neon.
- Production : environnement distinct prévu avant une mise en production réelle.

## Connexions

Deux chaînes de connexion sont utilisées :

- `DATABASE_URL` : connexion mutualisée utilisée par l’application ;
- `DIRECT_URL` : connexion directe utilisée par Prisma pour les migrations.

Les véritables chaînes de connexion sont stockées dans des variables
d’environnement et ne sont jamais enregistrées dans GitHub.

## Gestion du schéma

Le schéma est défini dans `prisma/schema.prisma`.

Les migrations existantes sont appliquées sur la base de recette avec :

`npx prisma migrate deploy`

La migration `20260425135147_ajout_modele_article` a été appliquée avec
succès sur la base Neon.

## Données de recette

La base de recette contient uniquement des données et comptes fictifs.
Aucune donnée personnelle réelle ou donnée issue de la production ne
doit y être enregistrée.

## Vérifications

La connexion et le schéma sont contrôlés avec :

- `npx prisma migrate status` ;
- `npx prisma generate` ;
- `npx prisma studio`.

L’application est ensuite testée localement en utilisant temporairement
la connexion Neon.