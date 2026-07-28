import { expect, test } from "@playwright/test";

test("l'utilisateur peut choisir une humeur et recevoir une suggestion", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: /Stress/i }).click();

  const suggestion = page.getByRole("link", { name: /coh/i });

  await expect(suggestion).toBeVisible();
  await expect(suggestion).toHaveAttribute("href", "/respiration");
});

test("la page respiration affiche une liste d'exercices et permet d'ouvrir une fiche", async ({
  page,
}) => {
  await page.route("**/api/exercices", async (route) => {
    await route.fulfill({
      json: [
        {
          id_exercice: 42,
          nom_exercice: "Souffle test",
          temps_inspiration: 5,
          temps_apnee: 2,
          temps_expiration: 7,
          description: "Exercice injecte par le test fonctionnel.",
        },
      ],
    });
  });

  await page.goto("/respiration");

  await expect(
    page.getByRole("heading", { name: "Souffle test" }),
  ).toBeVisible();
  await expect(page.getByText("5s")).toBeVisible();

  await page.getByRole("link", { name: /Souffle test/i }).click();
  await expect(page).toHaveURL(/\/respiration\/42$/);
});
