import type { Metadata } from "next";

import Link from "next/link";
import {
  Cookie,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Confidentialite",
  description: "Politique de confidentialite de CESIZEN.",
};

const privacySections = [
  {
    title: "Donnees collectees",
    icon: Database,
    color: "text-purple-600 dark:text-purple-400",
    background: "bg-purple-50 dark:bg-purple-900/20",
    content:
      "CESIZEN peut collecter les informations necessaires a la creation et a la gestion de votre compte, comme votre nom, votre adresse email, vos preferences d'utilisation et les donnees techniques utiles au bon fonctionnement du service.",
  },
  {
    title: "Utilisation des informations",
    icon: UserCheck,
    color: "text-sky-600 dark:text-sky-400",
    background: "bg-sky-50 dark:bg-sky-900/20",
    content:
      "Ces informations servent a vous authentifier, personnaliser votre experience, ameliorer les contenus de prevention et assurer la securite de la plateforme. Elles ne sont pas revendues a des tiers.",
  },
  {
    title: "Cookies et mesure d'audience",
    icon: Cookie,
    color: "text-emerald-600 dark:text-emerald-400",
    background: "bg-emerald-50 dark:bg-emerald-900/20",
    content:
      "Des cookies strictement necessaires peuvent etre utilises pour maintenir votre session et memoriser certains reglages. Lorsque des mesures d'audience sont mises en place, elles sont limitees a l'amelioration du service.",
  },
  {
    title: "Conservation",
    icon: FileText,
    color: "text-purple-600 dark:text-purple-400",
    background: "bg-purple-50 dark:bg-purple-900/20",
    content:
      "Les donnees sont conservees uniquement pendant la duree necessaire aux finalites decrites dans cette politique, sauf obligation legale ou demande explicite de suppression de votre part.",
  },
  {
    title: "Securite",
    icon: LockKeyhole,
    color: "text-sky-600 dark:text-sky-400",
    background: "bg-sky-50 dark:bg-sky-900/20",
    content:
      "Nous appliquons des mesures raisonnables pour proteger vos donnees contre l'acces non autorise, la perte, l'alteration ou la divulgation. Aucun service numerique ne peut toutefois garantir un risque zero.",
  },
  {
    title: "Vos droits",
    icon: ShieldCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    background: "bg-emerald-50 dark:bg-emerald-900/20",
    content:
      "Vous pouvez demander l'acces, la rectification, la suppression ou la limitation du traitement de vos donnees personnelles. Vous pouvez egalement vous opposer a certains traitements lorsque la loi le permet.",
  },
];

export default function ConfidentialitePage() {
  return (
    <div className="w-full bg-background px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-purple-50 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Politique de confidentialite
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            Chez CESIZEN, la confiance fait partie de l'experience. Cette page
            resume de facon claire comment vos donnees sont traitees lorsque
            vous utilisez la plateforme.
          </p>
          <p className="mt-4 text-sm font-semibold text-purple-600 dark:text-purple-400">
            Derniere mise a jour : 5 mai 2026
          </p>
        </section>

        <section className="mb-12 rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-purple-50 p-6 dark:border-zinc-800 dark:from-sky-900/10 dark:to-purple-900/10 md:p-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Principes essentiels
            </p>
            <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
              Des donnees limitees a ce qui est utile
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
              CESIZEN est concu pour accompagner le bien-etre et la prevention.
              Nous cherchons donc a limiter les donnees collectees, a expliquer
              leur usage simplement et a vous laisser la main sur vos
              informations personnelles.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {privacySections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${section.background} ${section.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {section.content}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-12 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-purple-900/5 dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Une question ?
              </p>
              <h2 className="mb-3 text-2xl font-extrabold text-gray-900 dark:text-white">
                Contact relatif aux donnees personnelles
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Pour exercer vos droits ou obtenir une precision sur cette
                politique, vous pouvez nous contacter directement depuis la page
                contact.
              </p>
            </div>
            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-700 md:w-auto"
              href="/contact"
            >
              <Mail className="h-4 w-4" />
              Nous contacter
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
