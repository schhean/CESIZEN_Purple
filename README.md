# CESIZEN

CESIZEN est une application Next.js dediee au bien-etre et a la prevention du stress. Elle propose notamment des exercices de respiration, des articles de prevention, un espace compte utilisateur et une partie administration.

## Technologies

- Next.js avec App Router
- React et TypeScript
- HeroUI
- Tailwind CSS
- Prisma
- NextAuth
- Vitest
- Testing Library
- Playwright

## Installation

Installer les dependances :

```bash
npm install
```

Lancer le serveur de developpement :

```bash
npm run dev
```

L'application est ensuite disponible sur :

```text
http://localhost:3000
```

## Tests

Le projet contient 6 tests repartis en 3 familles :

- 2 tests unitaires
- 2 tests de non-regression
- 2 tests fonctionnels

Les tests sont ranges dans le dossier `tests/`.

```text
tests/
  unit/
  regression/
  e2e/
  setup/
```

## Tests unitaires

Fichier :

```text
tests/unit/utils.test.ts
```

Les tests unitaires verifient des fonctions isolees, sans lancer toute l'application.

Parcours couverts :

- Verification de `cn()` dans `lib/utils.ts` : le test controle que les classes CSS sont bien fusionnees et que les conflits Tailwind sont resolus correctement.
- Verification de `hash()` et `compare()` dans `lib/bcrypt.ts` : le test controle qu'un mot de passe hashe est reconnu avec le bon mot de passe, refuse avec un mauvais mot de passe, et qu'il n'est pas stocke en clair.

Lancer uniquement les tests unitaires :

```bash
npm run test:unit
```

## Tests de non-regression

Fichiers :

```text
tests/regression/home.regression.test.tsx
tests/regression/respiration.regression.test.tsx
```

Les tests de non-regression servent a verifier qu'une fonctionnalite ou un affichage deja valide ne change pas involontairement apres une modification du code.

Ils utilisent Vitest, Testing Library et des snapshots.

Parcours couverts :

- Page d'accueil : le test verifie que le titre principal et les deux boutons importants sont toujours presents, puis compare la structure HTML avec un snapshot.
- Page respiration : le test simule une reponse de l'API `/api/exercices`, verifie que l'exercice s'affiche avec ses durees et compare le rendu avec un snapshot.

Les snapshots sont stockes ici :

```text
tests/regression/__snapshots__/
```

Lancer uniquement les tests de non-regression :

```bash
npm run test:regression
```

Si une modification visuelle est volontaire, il faut mettre a jour les snapshots :

```bash
npx vitest run tests/regression -u
```

## Tests fonctionnels

Fichier :

```text
tests/e2e/home.spec.ts
```

Les tests fonctionnels utilisent Playwright. Ils lancent l'application dans un navigateur Chromium et verifient des parcours utilisateur reels.

Parcours couverts :

- Page d'accueil : l'utilisateur clique sur une humeur de stress, puis l'application affiche une suggestion vers la respiration.
- Page respiration : le test intercepte l'appel API `/api/exercices`, injecte un exercice de test, verifie son affichage, puis clique sur la carte pour ouvrir la fiche `/respiration/42`.

Lancer uniquement les tests fonctionnels :

```bash
npm run test:functional
```

Au premier lancement, si Playwright indique que le navigateur est manquant, installer Chromium :

```bash
npx playwright install chromium
```

## Lancer tous les tests

La commande globale lance les 3 familles de tests dans cet ordre :

1. Tests unitaires
2. Tests de non-regression
3. Tests fonctionnels

Commande :

```bash
npm run test
```

Equivalent :

```bash
npm run test:unit
npm run test:regression
npm run test:functional
```

## Configuration des tests

Fichiers de configuration :

```text
vitest.config.ts
playwright.config.ts
tests/setup/vitest.setup.ts
```

`vitest.config.ts` configure Vitest avec :

- l'environnement `jsdom`
- l'alias `@` vers la racine du projet
- le fichier de setup commun

`tests/setup/vitest.setup.ts` configure :

- `@testing-library/jest-dom`
- le nettoyage automatique du DOM apres chaque test
- un mock de `matchMedia`, utile pour les composants qui dependent du navigateur

`playwright.config.ts` configure :

- le dossier des tests fonctionnels : `tests/e2e`
- le navigateur Chromium
- le lancement automatique du serveur Next.js avec `npm run dev`
- l'URL de test : `http://127.0.0.1:3000`

## Scripts utiles

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:unit
npm run test:regression
npm run test:functional
```
