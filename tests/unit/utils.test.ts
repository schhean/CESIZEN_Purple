import { describe, expect, it } from "vitest";

import { compare, hash } from "@/lib/bcrypt";
import { cn } from "@/lib/utils";

describe("utils", () => {
  it("fusionne les classes CSS et garde la derniere classe Tailwind conflictuelle", () => {
    const className = cn("px-2 py-1 text-sm", false, "px-4", "font-bold");

    expect(className).toBe("py-1 text-sm px-4 font-bold");
  });

  it("valide uniquement le bon mot de passe apres hashage", async () => {
    const hashedPassword = await hash("mot-de-passe-solide");

    await expect(compare("mot-de-passe-solide", hashedPassword)).resolves.toBe(true);
    await expect(compare("mauvais-mot-de-passe", hashedPassword)).resolves.toBe(false);
    expect(hashedPassword).not.toBe("mot-de-passe-solide");
  });
});
