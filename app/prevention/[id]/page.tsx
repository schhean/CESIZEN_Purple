"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, FileText } from "lucide-react";

/**
 * Type décrivant la structure complète d'un article de prévention.
 * Contrairement à la page de liste, on récupère ici le "contenu" complet
 * ainsi que les informations relationnelles (l'auteur).
 */
interface Article {
  id_article: number;
  titre: string;
  contenu: string;
  date_creation: string;
  auteur: {
    nom: string;
    prenom: string;
  } | null;
}

export default function ArticleDetailPage() {
  /**
   * @hook
   * Utilisation de useParams pour extraire l'ID depuis l'URL dynamique (ex: /prevention/3).
   * Utilisation de useRouter pour permettre le retour à la page précédente.
   */
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  /**
   * @state {Article | null} article - Stocke les données de l'article une fois chargées.
   * @state {boolean} isLoading - Gère l'affichage du spinner de chargement.
   */
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @effect
   * Hook déclenché au montage du composant ou si l'ID change.
   * Interroge la route API spécifique à cet article. Si l'API renvoie une erreur
   * (ex: article non publié ou inexistant), l'état `article` reste null.
   */
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${id}`);

        if (!response.ok) throw new Error("Article introuvable");
        const data = await response.json();

        setArticle(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 min-h-[80vh] flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Chargement de l'article...
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto p-6 min-h-[80vh] flex flex-col justify-center items-center text-center">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Article introuvable
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Cet article n'existe pas ou n'est plus disponible.
        </p>
        <button
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium transition-colors"
          onClick={() => router.back()}
        >
          Retour à la prévention
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6 min-h-[80vh] pb-24">
      <button
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium mb-12 mt-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux articles
      </button>

      <header className="mb-12 border-b border-gray-100 dark:border-zinc-800 pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
          {article.titre}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {new Date(article.date_creation).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          {article.auteur && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Par {article.auteur.prenom} {article.auteur.nom}
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
          {article.contenu}
        </p>
      </div>
    </article>
  );
}

/* =====================================================================
 * DOCUMENTATION DU COMPOSANT ArticleDetailPage
 * =====================================================================
 *
 * Ce composant a pour rôle d'afficher le contenu complet d'un article
 * spécifique sélectionné depuis la page Prévention.
 *
 * 1. Routage dynamique (Next.js) :
 * ---------------------------------------------------------------------
 * - Le fichier doit être placé dans `app/prevention/[id]/page.tsx`.
 * - `useParams()` récupère l'`id` de l'article directement depuis l'URL
 * (ex: /prevention/3 -> id = 3).
 *
 * 2. Récupération des données (useEffect) :
 * ---------------------------------------------------------------------
 * - On fait un `fetch` vers notre nouvelle route API `/api/articles/[id]`.
 * - Si l'article n'existe pas ou n'est pas publié (erreur 404 renvoyée
 * par l'API), le code "attrape" l'erreur et l'état `article` reste `null`.
 *
 * 3. Gestion des états (UI) :
 * ---------------------------------------------------------------------
 * - Chargement (Spinner) : Pendant le fetch, on affiche un cercle qui
 * tourne (`animate-spin`) stylisé aux couleurs du site.
 * - Introuvable (404 visuelle) : Si l'article est `null` après le chargement,
 * on affiche un message d'erreur amical avec un bouton pour revenir en arrière.
 *
 * 4. Formatage du texte (whitespace-pre-wrap) :
 * ---------------------------------------------------------------------
 * C'est le point le plus important pour un blog basique. Quand tu tapes
 * un texte dans le `<textarea>` de ton administration et que tu fais
 * "Entrée", ça crée des caractères invisibles `\n`.
 * En HTML normal, ces retours à la ligne sont ignorés. La classe Tailwind
 * `whitespace-pre-wrap` force le navigateur à respecter ces retours à la
 * ligne pour que ton article garde ses paragraphes intacts.
 * ===================================================================== */
