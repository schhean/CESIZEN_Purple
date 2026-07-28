# Intégration continue de CESIZen

## Objectif

L’intégration continue permet de contrôler automatiquement la qualité et
le bon fonctionnement de l’application avant l’intégration d’une
modification dans la branche principale.

## Outil retenu

GitHub Actions est utilisé pour exécuter le workflow d’intégration
continue directement depuis le dépôt GitHub.

Le workflow est défini dans :

`.github/workflows/ci.yml`

## Déclenchement

La CI est déclenchée :

- lors d’une Pull Request vers `main` ;
- après un push sur `main` ;
- manuellement depuis l’interface GitHub Actions.

## Étapes automatisées

Le workflow exécute successivement :

1. la récupération du dépôt ;
2. l’installation de Node.js ;
3. l’installation reproductible des dépendances avec `npm ci` ;
4. la vérification ESLint ;
5. la vérification TypeScript ;
6. les tests unitaires ;
7. les tests de non-régression ;
8. la compilation Next.js ;
9. les tests fonctionnels Playwright.

## Gestion des erreurs

Lorsqu’une étape échoue, les étapes suivantes ne sont normalement pas
exécutées et le contrôle GitHub est marqué en échec.

La Pull Request ne doit pas être fusionnée tant que le problème n’est pas
corrigé.

## Sécurité

Le workflow dispose uniquement d’un accès en lecture au contenu du dépôt.

Les valeurs déclarées dans le workflow sont réservées aux contrôles de CI
et ne correspondent pas aux secrets de production.

Les secrets de recette et de production seront stockés dans les espaces
sécurisés de GitHub et de la plateforme de déploiement.