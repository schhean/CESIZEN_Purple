import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import RespirationPage from "@/app/respiration/page";

describe("non regression - respiration", () => {
  it("affiche les exercices retournes par l'API avec une structure stable", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id_exercice: 7,
          nom_exercice: "Respiration carree",
          temps_inspiration: 4,
          temps_apnee: 4,
          temps_expiration: 4,
          description: "Un rythme simple pour retrouver le calme.",
        },
      ],
    } as Response);

    const { container } = render(React.createElement(RespirationPage));

    await waitFor(() => {
      expect(screen.getByText("Respiration carree")).toBeInTheDocument();
    });

    expect(screen.getAllByText("4s")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /Respiration carree/i })).toHaveAttribute(
      "href",
      "/respiration/7",
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
