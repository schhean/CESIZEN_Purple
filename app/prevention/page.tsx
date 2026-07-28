"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Leaf } from "lucide-react";

/**
 * Type décrivant la structure des données d'un article de prévention
 * retourné par l'API backend pour l'affichage en liste.
 * Note: Le contenu complet n'est pas chargé ici pour des raisons de performance.
 */
interface Article {
  id_article: number;
  titre: string;
  resume: string | null;
  date_creation: string;
}

export default function PreventionPage() {
  /**
   * @state {Article[]} articles - Stocke la liste des articles récupérés depuis l'API.
   * Initialisé avec un tableau vide.
   */
  const [articles, setArticles] = useState<Article[]>([]);

  /**
   * @state {boolean} isLoading - Indique si la requête API est en cours de traitement.
   * Utilisé pour afficher l'état de chargement visuel (Skeletons).
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @effect
   * Hook déclenché au montage du composant.
   * Il exécute la fonction asynchrone `fetchArticles` qui :
   * 1. Appelle l'endpoint `/api/articles` (configuré côté backend pour ne renvoyer que les articles publiés).
   * 2. Met à jour le state `articles` avec les données reçues.
   * 3. Termine l'état de chargement (`setIsLoading(false)`) dans le bloc `finally`.
   */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");

        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();

        setArticles(data);
      } catch (error) {
        console.error("Impossible de charger les articles :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[80vh]">
      <div className="text-center mb-16 mt-8">
        <div className="inline-flex items-center justify-center p-3 bg-teal-50 dark:bg-teal-900/30 rounded-full mb-4 text-teal-600 dark:text-teal-400">
          <Leaf className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Espace Prévention
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Découvrez nos conseils, guides et articles rédigés par des experts
          pour mieux comprendre et gérer votre stress au quotidien.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="h-64 bg-gray-100 dark:bg-zinc-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Aucun article pour le moment
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Revenez très bientôt pour découvrir nos nouveaux contenus.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id_article}
              className="group flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-900/50 transition-all duration-300"
              href={`/prevention/${article.id_article}`}
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-4 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date_creation).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                  {article.titre}
                </h2>

                {article.resume && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {article.resume}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all">
                  Lire l'article
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
 * DOCUMENTATION DU COMPOSANT PreventionPage
 * =====================================================================
 *
 * Ce composant est la vitrine publique du blog. Il affiche uniquement
 * les articles marqués comme "publiés" par l'administrateur.
 *
 * 1. La navigation (Link) et les icônes (lucide-react) :
 * ---------------------------------------------------------------------
 * - On utilise `next/link` pour envelopper nos cartes d'articles. Quand
 * l'utilisateur clique, il sera redirigé vers `/prevention/[id]`.
 * - L'icône `Leaf` (feuille) est utilisée dans l'en-tête pour accentuer
 * le côté santé naturelle/bien-être.
 *
 * 2. L'Interface (TypeScript) :
 * ---------------------------------------------------------------------
 * - L'interface `Article` définit ce que l'API nous renvoie. Note qu'on
 * ne récupère pas le `contenu` complet de l'article ici. C'est une bonne
 * pratique d'optimisation : on ne charge le gros texte que si l'utilisateur
 * clique sur l'article.
 *
 * 3. La récupération des données (useEffect) :
 * ---------------------------------------------------------------------
 * - Au montage de la page, le composant fait un appel à `/api/articles`.
 * - IMPORTANT : Cette route API (que nous avons créée à part) contient
 * une instruction Prisma `where: { est_publie: true }`. Ainsi, les brouillons
 * restent cachés.
 *
 * 4. Gestion des états de chargement (UX/UI) :
 * ---------------------------------------------------------------------
 * Le rendu JSX gère 3 états différents pour l'utilisateur :
 * - État de Chargement : Affiche des "skeletons" (des blocs gris animés
 * avec `animate-pulse`) pendant que les données arrivent du serveur.
 * - État Vide : Si aucun article n'est publié, on affiche un message clair
 * et designisé avec une icône au lieu d'une page blanche.
 * - État Rempli : Affiche la grille (grid) d'articles.
 *
 * 5. Le Design de la Carte d'Article (Tailwind) :
 * ---------------------------------------------------------------------
 * - `group` : Ajouté sur le conteneur <Link>. Cela permet de déclencher
 * des animations sur les enfants quand le parent est survolé.
 * - Formatage de la date : Utilisation de `toLocaleDateString('fr-FR')`
 * avec des options pour afficher "15 mars 2024" au lieu de "15/03/2024".
 * - `line-clamp-2` et `line-clamp-3` : Ces classes Tailwind sont magiques.
 * Elles coupent le texte automatiquement et ajoutent "..." si le titre
 * ou le résumé dépasse 2 ou 3 lignes. Ça garantit que toutes les cartes
 * font la même taille.
 * - L'animation de la flèche : Sur la ligne "Lire l'article", l'icône
 * ArrowRight est invisible (`opacity-0`) de base, et au survol (`group-hover`),
 * elle apparaît et glisse vers la droite.
 * ===================================================================== */
