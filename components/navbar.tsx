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
} from "@heroui/react";
import Auth from "./authentification/auth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Accueil",
    "Respiration",
    "Prévention",
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

        <NavbarItem>
          <Auth />
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <AnimatedThemeToggler />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <AnimatedThemeToggler />
      </NavbarMenu>
    </Navbar>
  );
}