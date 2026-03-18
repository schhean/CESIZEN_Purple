"use client";

import React from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Spinner
} from "@heroui/react";
import Auth from "./authentification/auth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useSession, signOut } from "next-auth/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Récupération de la session NextAuth
  const { data: session, status } = useSession();

  // Détermination de l'état de connexion et du rôle
  const isLoggedIn = status === "authenticated";

  // On vérifie ici si l'utilisateur est un admin (ajuste "ADMIN" selon ce que tu as en base de données)
  // Note: il faut s'assurer que tu retournes bien le 'role' dans le callback 'jwt' et 'session' de NextAuth
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Respiration", href: "/respiration" },
    { name: "Prévention", href: "/prevention" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image
            src="/cesizen_purple_transparent_without_text.png"
            alt="Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <p className="font-bold text-inherit text-xl">CESI<span>ZEN</span></p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Image
            src="/ministère-light.png"
            alt="Logo Ministère (Clair)"
            width={120}
            height={50}
            className="mr-2 w-24 dark:hidden"
          />
          <Image
            src="/ministère-dark.png"
            alt="Logo Ministère (Sombre)"
            width={120}
            height={50}
            className="mr-2 w-24 hidden dark:block"
          />
          <Image
            src="/cesizen_purple_transparent_without_text.png"
            alt="Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <p className="font-bold text-inherit text-xl">CESI<span className="text-purple-800">ZEN</span></p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/respiration">
            Respiration
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/prevention">
            Prévention
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex text-gray-500 default-300 dark:text-gray-default-700 select-none">
          |
        </NavbarItem>

        {status === "authenticated" && isAdmin && (
          <NavbarItem className="flex items-center">
            <Button
              as={Link}
              href="/admin"
              color="secondary"
              variant="flat"
              className="font-semibold"
            >
              Espace Admin
            </Button>
          </NavbarItem>
        )}

        <NavbarItem className="flex items-center h-full">
          {status === "loading" ? (
            <Spinner color="current" className="text-purple-800" size="sm" />
          ) : status === "authenticated" ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="success"
                  showFallback
                  src="image_user.png"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu utilisateur" variant="flat">
                <DropdownItem key="settings" href="/mon-compte">
                  Gérer mon compte
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => signOut()}
                >
                  Déconnexion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Auth />
          )}
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <AnimatedThemeToggler />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <AnimatedThemeToggler />
      </NavbarMenu>
    </Navbar>
  );
}