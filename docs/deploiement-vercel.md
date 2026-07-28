# Déploiement de CESIZen sur Vercel

## Solution retenue

L’application Next.js CESIZen est hébergée sur Vercel.

Le projet Vercel est connecté au dépôt GitHub afin d’automatiser les
déploiements à partir des branches et des Pull Requests.

## Architecture de déploiement

Le fonctionnement retenu est le suivant :

GitHub → Vercel → Prisma → PostgreSQL Neon

## Environnements

### Développement

- application exécutée localement ;
- variables dans `.env.local` ;
- base PostgreSQL locale.

### Preview

- générée depuis les branches et Pull Requests ;
- utilisée pour les tests avant fusion ;
- connectée à la base de recette Neon ;
- données exclusivement fictives.

### Production de démonstration

- générée depuis la branche `main` ;
- accessible depuis l’URL stable Vercel ;
- utilisée pour la démonstration du projet.

Une production réelle devrait utiliser une base et des secrets distincts
de ceux de la recette.

## Configuration

Les variables suivantes sont enregistrées dans Vercel :

- `DATABASE_URL` ;
- `DIRECT_URL` ;
- `NEXTAUTH_SECRET` ;
- `NEXTAUTH_URL`.

Leurs valeurs ne sont jamais versionnées dans GitHub.

## Procédure de déploiement

1. création d’un ticket ;
2. création d’une branche ;
3. réalisation de la modification ;
4. création d’une Pull Request ;
5. exécution de la CI GitHub Actions ;
6. création d’un déploiement Preview ;
7. réalisation des tests ;
8. fusion dans `main` ;
9. déploiement automatique en production.

## Vérifications réalisées

- disponibilité des pages publiques ;
- connexion à la base Neon ;
- inscription et authentification ;
- création et lecture de données ;
- contrôle des journaux Vercel ;
- validation du build.

## Retour arrière

En cas d’anomalie après une mise en production :

1. consulter les journaux Vercel ;
2. identifier le dernier déploiement stable ;
3. effectuer un retour arrière depuis l’historique des déploiements ;
4. vérifier le rétablissement de l’application ;
5. créer un ticket d’incident ;
6. corriger dans une nouvelle branche ;
7. valider la correction par la CI et une Preview ;
8. effectuer un nouveau déploiement.