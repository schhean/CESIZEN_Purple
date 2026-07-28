"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wind, ArrowRight, PlayCircle } from "lucide-react";

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

export default function RespirationPage() {
  /**
   * @state {Exercice[]} exercices - Stocke la liste complète des exercices récupérés.
   * Initialisé en tant que tableau vide.
   */
  const [exercices, setExercices] = useState<Exercice[]>([]);

  /**
   * @state {boolean} isLoading - Gère l'affichage de l'état de chargement (Skeletons).
   * Initialisé à `true` car on attend le retour de l'API au montage.
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @effect
   * Hook déclenché une seule fois au montage du composant.
   * Il déclare et exécute une fonction asynchrone `fetchExercices` qui :
   * 1. Interroge la route API `/api/exercices`.
   * 2. Parse la réponse JSON et la stocke dans le state `exercices`.
   * 3. Passe le state `isLoading` à `false` dans le bloc `finally` (que la requête ait réussi ou échoué).
   */
  useEffect(() => {
    const fetchExercices = async () => {
      try {
        const response = await fetch("/api/exercices");

        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();

        setExercices(data);
      } catch (error) {
        console.error("Impossible de charger les exercices :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[80vh] bg-background">
      {/* En-tête de la page */}
      <div className="text-center mb-16 mt-8">
        <div className="inline-flex items-center justify-center p-3 bg-sky-50 dark:bg-sky-900/30 rounded-full mb-4 text-sky-600 dark:text-sky-400">
          <Wind className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Exercices de Respiration
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Prenez un moment pour vous recentrer. Choisissez un exercice guidé
          pour réduire votre stress, améliorer votre concentration ou faciliter
          le sommeil.
        </p>
      </div>

      {/* État de chargement (Skeletons) */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="h-[350px] bg-gray-100 dark:bg-zinc-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : exercices.length === 0 ? (
        /* État vide (Aucun exercice) */
        <div className="text-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <Wind className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Aucun exercice disponible
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Les exercices de respiration arriveront très bientôt.
          </p>
        </div>
      ) : (
        /* Grille des exercices */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercices.map((exo) => (
            <Link
              key={exo.id_exercice}
              className="group flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-sky-200 dark:hover:border-sky-900/50 transition-all duration-300"
              href={`/respiration/${exo.id_exercice}`}
            >
              <div className="p-6 flex flex-col flex-grow">
                {/* Badge d'en-tête */}
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-4 uppercase tracking-wider">
                  <PlayCircle className="w-4 h-4" />
                  Exercice Guidé
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                  {exo.nom_exercice}
                </h2>

                {exo.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {exo.description}
                  </p>
                )}

                {/* Affichage des temps sous forme de badges modernes */}
                <div className="grid grid-cols-3 gap-2 mb-6 mt-auto">
                  <div className="text-center p-2 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/30">
                    <p className="text-lg font-bold text-sky-600 dark:text-sky-400">
                      {exo.temps_inspiration}s
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mt-0.5">
                      Inspire
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {exo.temps_apnee}s
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mt-0.5">
                      Bloque
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30">
                    <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
                      {exo.temps_expiration}s
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mt-0.5">
                      Expire
                    </p>
                  </div>
                </div>

                {/* Bouton d'action avec flèche animée */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center text-sm font-bold text-sky-600 dark:text-sky-400 group-hover:gap-2 transition-all">
                  Commencer la séance
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* =====================================================================
 * DOCUMENTATION DU COMPOSANT RespirationPage (Design "Zen")
 * =====================================================================
 *
 * Ce composant affiche la liste des exercices de respiration disponibles
 * sous forme de cartes cliquables avec un design harmonisé à la page Prévention.
 *
 * 1. La navigation (Link) et les icônes (lucide-react) :
 * ---------------------------------------------------------------------
 * - On enveloppe chaque carte dans un composant <Link> pour une navigation
 * fluide et sans rechargement de page vers `/respiration/[id]`.
 * - L'icône principale `Wind` (Vent/Air) rappelle le souffle, utilisant
 * la couleur "Sky" (Bleu ciel) pour le thème de la respiration.
 *
 * 2. Gestion des états (UI/UX) :
 * ---------------------------------------------------------------------
 * On retrouve les 3 mêmes états que sur la page prévention :
 * - Chargement : Affichage de "Skeletons" (boîtes grises qui clignotent
 * avec animate-pulse).
 * - Vide : Si l'API renvoie un tableau vide, on a un beau design de fallback.
 * - Succès : Affichage de la grille (grid) responsive.
 *
 * 3. Le Design de la Carte :
 * ---------------------------------------------------------------------
 * - Utilisation de la classe "group" sur le Link parent. Cela permet au
 * survol de la carte d'animer des éléments à l'intérieur (le texte devient
 * bleu, la flèche apparaît et glisse vers la droite).
 * - "line-clamp" limite le titre et la description pour garder des cartes
 * de la même taille, peu importe la longueur du texte de la base de données.
 *
 * 4. Les "Badges" de temps (Nouveau) :
 * ---------------------------------------------------------------------
 * Au lieu d'avoir les temps "flottants" comme avant, ils sont maintenant
 * encapsulés dans de petites boîtes aux coins arrondis (rounded-xl) avec
 * un fond très léger (bg-sky-50) et une bordure discrète.
 * Les couleurs correspondent exactement à celles utilisées dans le lecteur
 * (Timer) de l'exercice pour créer une cohérence cognitive (Bleu = Inspirer,
 * Violet = Bloquer, Vert/Teal = Expirer).
 * ===================================================================== */
