# Stratégie de versioning

Le projet CESIZen utilise Git et GitHub.

La branche `main` contient la version stable de l’application.

Chaque modification est réalisée dans une branche dédiée :

- `feature/` pour une fonctionnalité ;
- `fix/` pour une correction ;
- `security/` pour la sécurité ;
- `docs/` pour la documentation ;
- `test/` pour les tests.

Les modifications sont intégrées dans `main` avec une Pull Request et une fusion par squash.

Les commits utilisent les préfixes suivants :

- `feat:`
- `fix:`
- `security:`
- `docs:`
- `test:`
- `chore:`