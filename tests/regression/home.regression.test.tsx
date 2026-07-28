import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import HomeComponent from "@/app/page";

describe("non regression - accueil", () => {
  it("conserve les appels a l'action principaux et la structure de la page d'accueil", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const { container } = render(React.createElement(HomeComponent));

    expect(screen.getByText(/Bienvenue sur CESI/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Respirer maintenant/i }),
    ).toHaveAttribute("href", "/respiration");
    expect(screen.getByRole("link", { name: /articles/i })).toHaveAttribute(
      "href",
      "/prevention",
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
