"use client";

import { useState, useEffect } from "react";
import { Ripple } from "@/components/ui/ripple";
import Link from "next/link";
import { 
    Wind, BookOpen, ArrowRight, Brain, Clock, Leaf, 
    Quote, Smile, Meh, Frown, BatteryWarning, Heart
} from "lucide-react";

/**
 * Tableau contenant les citations aléatoires affichées en bas de page.
 * Ces données sont utilisées pour inspirer ou apaiser l'utilisateur.
 */
const citations = [
    "« Le calme est le pouvoir de l'esprit. »",
    "« La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur. » - Bouddha",
    "« Respirez. Laissez aller. Et rappelez-vous que ce moment est le seul que vous savez avoir à coup sûr. » - Oprah Winfrey",
    "« Souriez, respirez et allez lentement. » - Thich Nhat Hanh"
];

/**
 * Configuration des humeurs pour le "Baromètre de l'humeur".
 * Chaque objet définit un état émotionnel avec son identifiant, 
 * son icône (Lucide), son texte, et ses classes de couleurs dynamiques (Tailwind).
 */
const humeurs = [
    { id: 'epuise', icon: BatteryWarning, label: 'Épuisé(e)', color: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20', activeBg: 'bg-red-100 dark:bg-red-900/40' },
    { id: 'stresse', icon: Frown, label: 'Stressé(e)', color: 'text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20', activeBg: 'bg-orange-100 dark:bg-orange-900/40' },
    { id: 'moyen', icon: Meh, label: 'Moyen', color: 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20', activeBg: 'bg-yellow-100 dark:bg-yellow-900/40' },
    { id: 'bien', icon: Smile, label: 'Bien', color: 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20', activeBg: 'bg-emerald-100 dark:bg-emerald-900/40' },
    { id: 'super', icon: Heart, label: 'En pleine forme', color: 'text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20', activeBg: 'bg-purple-100 dark:bg-purple-900/40' },
];

export default function HomeComponent() {
    /**
     * @state {string} citationDuJour 
     * Stocke la citation qui sera affichée à l'utilisateur. 
     * Initialisée vide, elle est remplie côté client lors du montage.
     */
    const [citationDuJour, setCitationDuJour] = useState("");

    /**
     * @state {string | null} humeurSelectionnee 
     * Enregistre l'ID de l'humeur cliquée par l'utilisateur (ex: 'stresse', 'bien').
     * Null par défaut (aucune humeur sélectionnée).
     */
    const [humeurSelectionnee, setHumeurSelectionnee] = useState<string | null>(null);

    /**
     * @effect
     * Hook déclenché une seule fois au montage du composant (grâce au tableau de dépendances vide []).
     * Il calcule un index aléatoire basé sur la longueur du tableau `citations`,
     * récupère la citation correspondante et met à jour le state `citationDuJour`.
     * Cela évite les erreurs d'hydratation (différence entre le serveur et le client).
     */
    useEffect(() => {
        const randomQuote = citations[Math.floor(Math.random() * citations.length)];
        setCitationDuJour(randomQuote);
    }, []);

    return (
        <div className="w-full pb-16 md:pb-24 overflow-x-hidden bg-background">
            
            <div className="bg-background relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden gap-4 md:gap-6 px-4 py-12 md:py-0">
                <p className="z-10 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter whitespace-pre-wrap text-black dark:text-white mt-8 md:mt-12">
                    Bienvenue sur CESI<span className="text-purple-600 dark:text-purple-400">ZEN</span>
                </p>
                <p className="z-10 text-center text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed px-2">
                    Retrouvez votre équilibre intérieur en un seul souffle grâce à CESIZEN, votre refuge pour une meilleure santé mentale.
                </p>

                <div className="z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 w-full sm:w-auto px-4 sm:px-0">
                    <Link href="/respiration" className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-base md:text-lg transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 hover:scale-105">
                        <Wind className="w-5 h-5" />
                        Respirer maintenant
                    </Link>
                    <Link href="/prevention" className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-full font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 hover:scale-105">
                        <BookOpen className="w-5 h-5" />
                        Découvrir les articles
                    </Link>
                </div>

                <Ripple className="[&_div]:border-purple-400/40 [&_div]:bg-purple-300/10" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-8 relative z-20">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-purple-900/5 border border-gray-100 dark:border-zinc-800 text-center">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Comment vous sentez-vous aujourd'hui ?</h2>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
                        {humeurs.map((humeur) => {
                            const Icon = humeur.icon;
                            const isSelected = humeurSelectionnee === humeur.id;
                            return (
                                <button 
                                    key={humeur.id}
                                    onClick={() => setHumeurSelectionnee(humeur.id)}
                                    className={`flex flex-col items-center gap-1.5 md:gap-2 p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 w-[70px] sm:w-auto ${humeur.color} ${isSelected ? humeur.activeBg + ' scale-110 shadow-md' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                                >
                                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" strokeWidth={isSelected ? 2.5 : 1.5} />
                                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 text-center leading-tight">{humeur.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    
                    {humeurSelectionnee && (
                        <div className="mt-6 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {(humeurSelectionnee === 'epuise' || humeurSelectionnee === 'stresse') && (
                                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Prenez une pause. Un exercice de <Link href="/respiration" className="text-purple-600 dark:text-purple-400 underline hover:text-purple-700">cohérence cardiaque</Link> pourrait vous faire le plus grand bien.
                                </p>
                            )}
                            {(humeurSelectionnee === 'moyen' || humeurSelectionnee === 'bien' || humeurSelectionnee === 'super') && (
                                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Super ! C'est le moment idéal pour lire nos <Link href="/prevention" className="text-teal-600 dark:text-teal-400 underline hover:text-teal-700">derniers articles santé</Link>.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 md:mt-24">
                <div className="bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/10 dark:to-purple-900/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-sky-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="flex-1 text-center md:text-left order-2 md:order-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-200/50 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4">
                            ⭐ Recommandation du jour
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 md:mb-4">La respiration 4-7-8</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Un exercice scientifiquement prouvé pour calmer le système nerveux et favoriser un endormissement rapide. Parfait pour terminer la journée.
                        </p>
                        <Link href="/respiration" className="inline-flex items-center justify-center md:justify-start gap-2 font-bold text-sky-600 dark:text-sky-400 hover:gap-3 transition-all w-full md:w-auto">
                            Essayer cet exercice <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                    </div>
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-sky-300 to-purple-400 opacity-80 blur-xl animate-pulse flex-shrink-0 order-1 md:order-2"></div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 md:mt-24">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Pourquoi choisir CESIZEN ?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="text-center p-4 sm:p-6 bg-white dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 dark:border-zinc-800 md:border-none">
                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                            <Clock className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">Rapide et Efficace</h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Seulement 5 minutes d'exercices par jour suffisent pour ressentir des effets positifs durables.</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 dark:border-zinc-800 md:border-none">
                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                            <Brain className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">Soutenu par la Science</h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Basé sur les principes reconnus de la cohérence cardiaque pour synchroniser votre corps et votre esprit.</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 dark:border-zinc-800 md:border-none sm:col-span-2 md:col-span-1">
                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                            <Leaf className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">100% Naturel</h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Retrouvez votre calme intérieur sans artifice, simplement en réapprenant à maîtriser votre souffle.</p>
                    </div>
                </div>
            </div>

            {citationDuJour && (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 md:mt-24 text-center">
                    <Quote className="w-8 h-8 md:w-12 md:h-12 text-gray-200 dark:text-zinc-800 mx-auto mb-4 md:mb-6 rotate-180" />
                    <p className="text-lg sm:text-xl md:text-3xl italic font-medium text-gray-700 dark:text-gray-300 leading-relaxed px-4 md:px-0">
                        {citationDuJour}
                    </p>
                </div>
            )}

        </div>
    );
}

/* ========================================================================================
EXPLICATION DE LA LOGIQUE INTERNE AU RENDU (JSX)
========================================================================================

1. Logique de rendu dynamique des boutons d'humeur :
   - `humeurs.map(...)` : On itère sur le tableau `humeurs` pour générer dynamiquement un bouton pour chaque émotion.
   - `const isSelected = humeurSelectionnee === humeur.id` : À chaque itération, on vérifie si le bouton généré correspond à l'humeur actuellement stockée dans le State.
   - `onClick={() => setHumeurSelectionnee(humeur.id)}` : Lors du clic, on met à jour le State avec l'ID du bouton cliqué.
   - Interpolation de classes (`className={...}`) : Si `isSelected` est vrai, on applique des styles Tailwind spécifiques (ex: l'humeur grossit `scale-110`, prend une ombre `shadow-md` et un fond de couleur active).

2. Rendu conditionnel des messages selon l'humeur :
   - `{humeurSelectionnee && (...)}` : Cette condition empêche l'affichage du bloc texte en dessous des boutons tant que l'utilisateur n'a rien cliqué.
   - `(humeurSelectionnee === 'epuise' || humeurSelectionnee === 'stresse') && (...)` : Cible les émotions négatives pour proposer une redirection ciblée vers l'outil de respiration.
   - `(humeurSelectionnee === 'moyen' || humeurSelectionnee === 'bien' || humeurSelectionnee === 'super') && (...)` : Cible les émotions positives/neutres pour rediriger vers des articles de prévention.

3. Rendu conditionnel de la citation du jour :
   - `{citationDuJour && (...)}` : Vérifie que la citation a bien été initialisée par le `useEffect` avant d'afficher le bloc. Cela évite d'afficher des icônes de guillemets vides pendant la fraction de seconde précédant le premier rendu côté client.

========================================================================================
*/