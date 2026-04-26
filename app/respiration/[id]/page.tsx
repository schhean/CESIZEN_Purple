"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Play, Pause, RotateCcw, ArrowLeft, Wind } from "lucide-react";

/**
 * Type décrivant la structure des données d'un exercice de respiration
 * retourné par l'API backend.
 */
interface Exercice {
  id_exercice: number;
  nom_exercice: string;
  temps_inspiration: number;
  temps_apnee: number;
  temps_expiration: number;
  description: string | null;
}

/**
 * Type limitant les phases de respiration possibles.
 * Permet un typage strict et évite les erreurs de casse.
 */
type Phase = "Inspiration" | "Apnée" | "Expiration";

export default function ExerciceDetailPage() {
  /**
   * @hook
   * Récupération des paramètres d'URL (Next.js) et du router pour la navigation.
   */
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  /**
   * @state
   * États relatifs au chargement et au stockage des données de l'exercice ciblé.
   */
  const [exercice, setExercice] = useState<Exercice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @state
   * États orchestrant le fonctionnement du chronomètre interactif.
   */
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("Inspiration");
  const [timeLeft, setTimeLeft] = useState(0);

  /**
   * @effect
   * Récupère la liste des exercices depuis l'API, isole celui correspondant 
   * à l'ID passé en paramètre d'URL, et initialise la minuterie avec le
   * temps d'inspiration de l'exercice trouvé.
   */
  useEffect(() => {
    const fetchExercice = async () => {
      try {
        const response = await fetch('/api/exercices');
        if (!response.ok) throw new Error("Erreur réseau");
        const data: Exercice[] = await response.json();
        
        const foundExo = data.find((e) => e.id_exercice === id);
        if (foundExo) {
          setExercice(foundExo);
          setTimeLeft(foundExo.temps_inspiration);
        }
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchExercice();
  }, [id]);

  /**
   * @effect
   * Moteur du chronomètre.
   * Gère le décompte des secondes et la transition automatique entre les
   * différentes phases (Inspiration -> Apnée -> Expiration -> ...) lorsque
   * le compteur atteint zéro, en fonction de la configuration de l'exercice.
   */
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isActive && timeLeft === 0 && exercice) {
      if (phase === "Inspiration") {
        if (exercice.temps_apnee > 0) {
          setPhase("Apnée");
          setTimeLeft(exercice.temps_apnee);
        } else {
          setPhase("Expiration");
          setTimeLeft(exercice.temps_expiration);
        }
      } else if (phase === "Apnée") {
        setPhase("Expiration");
        setTimeLeft(exercice.temps_expiration);
      } else if (phase === "Expiration") {
        setPhase("Inspiration");
        setTimeLeft(exercice.temps_inspiration);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, exercice]);

  /**
   * Met en pause ou relance le chronomètre interactif.
   */
  const toggleTimer = () => setIsActive(!isActive);

  /**
   * Réinitialise le chronomètre à son état d'origine (Inspiration, temps maximum).
   */
  const resetTimer = () => {
    setIsActive(false);
    setPhase("Inspiration");
    if (exercice) setTimeLeft(exercice.temps_inspiration);
  };

  if (isLoading) return <div className="p-12 text-center text-gray-500 dark:text-gray-400 animate-pulse font-medium mt-20">Chargement de la séance...</div>;
  if (!exercice) return <div className="p-12 text-center text-red-500 font-medium mt-20">Exercice introuvable.</div>;

  /**
   * Dictionnaire des styles (Tailwind) associés dynamiquement à chaque phase
   * de la respiration pour modifier l'interface en temps réel.
   */
  const phaseStyles = {
    Inspiration: {
      text: "text-sky-500 dark:text-sky-400",
      border: "border-sky-500 dark:border-sky-500",
      halo: "bg-sky-100 dark:bg-sky-900/30",
      shadow: "shadow-sky-500/20",
    },
    Apnée: {
      text: "text-purple-500 dark:text-purple-400",
      border: "border-purple-500 dark:border-purple-500",
      halo: "bg-purple-100 dark:bg-purple-900/30",
      shadow: "shadow-purple-500/20",
    },
    Expiration: {
      text: "text-teal-500 dark:text-teal-400",
      border: "border-teal-500 dark:border-teal-500",
      halo: "bg-teal-100 dark:bg-teal-900/30",
      shadow: "shadow-teal-500/20",
    }
  };

  const currentStyles = phaseStyles[phase];

  /**
   * Calcule et retourne la valeur de mise à l'échelle (scale) CSS
   * pour animer l'effet "halo" derrière le compteur principal.
   * @returns {string} Classes utilitaires Tailwind (scale et opacity).
   */
  const getHaloScale = () => {
    if (!isActive) return "scale-100 opacity-50";
    if (phase === "Inspiration") return "scale-[1.35] opacity-100";
    if (phase === "Expiration") return "scale-90 opacity-20";
    return "scale-110 opacity-60"; 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center min-h-[85vh] relative pt-20 sm:pt-12">
      
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux exercices
      </button>

      <div className="text-center mb-16 w-full">
        <div className="inline-flex items-center justify-center p-3 bg-sky-50 dark:bg-sky-900/30 rounded-full mb-4 text-sky-600 dark:text-sky-400 transition-colors">
          <Wind className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 transition-colors">
          {exercice.nom_exercice}
        </h1>
        {exercice.description && (
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            {exercice.description}
          </p>
        )}
      </div>

      <div className="flex-grow flex flex-col justify-center items-center w-full mb-12">
        <div className="relative flex items-center justify-center w-72 h-72">
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${currentStyles.halo} ${getHaloScale()}`}
          />

          <div className={`relative z-10 w-64 h-64 rounded-full border-[6px] bg-white dark:bg-zinc-900 flex flex-col items-center justify-center transition-colors duration-500 shadow-2xl ${currentStyles.border} ${currentStyles.shadow}`}>
            <span className={`text-xl uppercase tracking-[0.2em] font-bold mb-1 transition-colors ${currentStyles.text}`}>
              {phase}
            </span>
            <span className={`text-8xl font-black tabular-nums transition-colors ${currentStyles.text}`}>
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4 mt-auto">
        <button 
          onClick={toggleTimer}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-lg text-white shadow-lg transition-all duration-200 active:scale-95 ${
            isActive 
              ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/25" 
              : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/25"
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              Démarrer
            </>
          )}
        </button>
        
        <button 
          onClick={resetTimer}
          disabled={!isActive && timeLeft === exercice?.temps_inspiration && phase === "Inspiration"}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-semibold text-lg bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-5 h-5" />
          Réinitialiser
        </button>
      </div>

    </div>
  );
}

/* =====================================================================
 * DOCUMENTATION DU COMPOSANT ExerciceDetailPage
 * =====================================================================
 *
 * Ce composant a pour rôle d'afficher les détails d'un exercice spécifique 
 * et de proposer un chronomètre interactif pour guider la respiration, avec
 * un design zen parfaitement aligné sur la charte graphique de l'application.
 *
 * 1. Les imports et la navigation (Next.js) :
 * ---------------------------------------------------------------------
 * - useParams : Permet de récupérer les paramètres de l'URL. Ici, on s'en
 * sert pour obtenir l'ID de l'exercice (ex: /respiration/3 -> id = 3).
 * - useRouter : Permet d'interagir avec l'historique du navigateur. On l'utilise
 * ici pour le bouton "Retour" avec l'icône de flèche (router.back()).
 * - lucide-react : Bibliothèque d'icônes (Play, Pause, Reset, ArrowLeft, Wind).
 *
 * 2. Les Types (TypeScript) :
 * ---------------------------------------------------------------------
 * - Type `Phase` : Restreint la variable "phase" à 3 valeurs exactes ("Inspiration", 
 * "Apnée", "Expiration"). Cela empêche les fautes de frappe dans le code.
 *
 * 3. Les États (useState) :
 * ---------------------------------------------------------------------
 * Il y a deux groupes d'états :
 * - Données : `exercice` stocke l'exercice en cours, `isLoading` gère le chargement.
 * - Lecteur/Timer : `isActive` (vrai si le timer tourne, faux s'il est en pause),
 * `phase` (l'étape actuelle de respiration), `timeLeft` (les secondes restantes).
 *
 * 4. La récupération des données (useEffect 1) :
 * ---------------------------------------------------------------------
 * - À l'ouverture de la page, on va chercher tous les exercices.
 * - On utilise `.find()` pour isoler celui dont l'ID correspond à l'URL.
 * - Dès qu'on l'a trouvé, on initialise le `timeLeft` avec le temps d'inspiration
 * pour que le compteur affiche directement le bon chiffre avant de démarrer.
 *
 * 5. Le moteur du chronomètre (useEffect 2) :
 * ---------------------------------------------------------------------
 * C'est le cœur de la logique, qui se déclenche chaque fois que `isActive`, 
 * `timeLeft` ou `phase` changent.
 * - SI le timer est actif ET qu'il reste du temps : On utilise `setInterval` 
 * pour enlever 1 à `timeLeft` toutes les 1000 millisecondes (1 seconde).
 * - SI le timer est actif ET que le temps est à 0 : Il faut passer à l'étape suivante.
 * - Si on inspirait : on passe en apnée (sauf s'il n'y a pas d'apnée, 
 * alors on passe directement à l'expiration).
 * - Si on était en apnée : on passe à l'expiration.
 * - Si on expirait : on repart au début (Inspiration) et la boucle recommence.
 * - `clearInterval(interval)` : Crucial pour éviter que le timer ne devienne fou 
 * et ne compte en double si on met en pause.
 *
 * 6. Les contrôles (Boutons) :
 * ---------------------------------------------------------------------
 * - toggleTimer : Inverse l'état `isActive`. Change l'icône (Play/Pause) et la 
 * couleur du bouton (Sky Blue pour démarrer, Ambre/Orange pour la pause).
 * - resetTimer : Coupe le timer, remet la phase à "Inspiration" et remet 
 * le compteur à sa valeur de départ. Ce bouton est désactivé (grisé) s'il n'y
 * a rien à réinitialiser.
 *
 * 7. L'interface (JSX, DA et Animations) :
 * ---------------------------------------------------------------------
 * - En-tête "Zen" : Ajout de l'icône Wind dans un cercle bleu clair pour faire 
 * le lien visuel avec la page précédente (la liste des exercices).
 * - phaseStyles : Un dictionnaire qui associe des couleurs spécifiques (textes,
 * bordures, fond du halo) à chaque phase (Bleu ciel=Inspiration, Violet=Apnée, Vert=Expiration).
 * - getHaloScale() : Gère la taille de l'animation en arrière-plan.
 * - L'animation de respiration (Halo) : Au lieu de faire grossir tout le composant,
 * on a un cercle central blanc/sombre (fixe), et une "bulle" colorée en arrière-plan 
 * qui grandit à l'inspiration et rétrécit à l'expiration.
 * - tabular-nums : Une classe Tailwind appliquée sur le gros chiffre du compteur
 * pour éviter un décalage visuel quand on passe de 10 à 9.
 * ===================================================================== */