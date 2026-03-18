"use client";

import { Ripple } from "@/components/ui/ripple";
import { Card, CardBody } from "@heroui/react";


export default function HomeComponent() {
    return (
        <div className="w-full">
            <div className="bg-background relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden gap-4">
                <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white">
                    Bienvenue sur CESI<span className="text-purple-800">ZEN</span>
                </p>
                <p className="z-10 text-center tracking-tighter whitespace-pre-wrap text-black dark:text-white">
                    Retrouvez votre équilibre intérieur en un seul souffle grâce à CESIZEN, votre refuge pour une meilleure santé mentale.
                </p>
                <Ripple className="[&_div]:border-purple-400/40 [&_div]:bg-purple-300/10" />
            </div>
            <div>
               
            </div>
        </div>
    );
}