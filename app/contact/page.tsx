import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock3,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'equipe CESIZEN pour une question, une aide ou un retour.",
};

const contactCards = [
  {
    title: "Nous ecrire",
    description: "Pour une question generale, une remarque ou une demande d'information.",
    value: "contact@cesizen.fr",
    href: "mailto:contact@cesizen.fr",
    icon: Mail,
    color: "text-purple-600 dark:text-purple-400",
    background: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-100 dark:border-purple-800/30",
  },
  {
    title: "Accompagnement",
    description: "Un souci avec votre compte ou l'utilisation des exercices ?",
    value: "support@cesizen.fr",
    href: "mailto:support@cesizen.fr",
    icon: MessageCircle,
    color: "text-sky-600 dark:text-sky-400",
    background: "bg-sky-50 dark:bg-sky-900/20",
    border: "border-sky-100 dark:border-sky-800/30",
  },
  {
    title: "Confidentialite",
    description: "Pour toute demande liee a vos donnees personnelles.",
    value: "privacy@cesizen.fr",
    href: "mailto:privacy@cesizen.fr",
    icon: ShieldCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    background: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800/30",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-background px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-purple-50 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <HeartHandshake className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Contactez CESI<span className="text-purple-600 dark:text-purple-400">ZEN</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            Une question, une suggestion ou besoin d'aide ? Notre equipe vous repond avec attention pour vous accompagner dans votre experience.
          </p>
        </section>

        <section className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-purple-900/60"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${card.background} ${card.border} ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                  {card.title}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
                <span className={`text-sm font-bold ${card.color}`}>{card.value}</span>
              </Link>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            action="mailto:contact@cesizen.fr"
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-purple-900/5 dark:border-zinc-800 dark:bg-zinc-900 md:p-8"
            encType="text/plain"
            method="post"
          >
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Message rapide
              </p>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Envoyez-nous quelques mots
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nom
                <input
                  name="nom"
                  placeholder="Votre nom"
                  className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
                <input
                  name="email"
                  placeholder="vous@email.fr"
                  className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                  type="email"
                />
              </label>
            </div>

            <label className="mt-5 flex flex-col gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Sujet
              <input
                name="sujet"
                placeholder="Comment pouvons-nous vous aider ?"
                className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
                type="text"
              />
            </label>

            <label className="mt-5 flex flex-col gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Message
              <textarea
                name="message"
                placeholder="Decrivez votre demande..."
                rows={6}
                className="resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-900/30"
              />
            </label>

            <button
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-700 sm:w-auto"
              type="submit"
            >
              <Send className="h-4 w-4" />
              Envoyer
            </button>
          </form>

          <aside className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-purple-50 p-6 dark:border-zinc-800 dark:from-sky-900/10 dark:to-purple-900/10 md:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-zinc-900 dark:text-sky-400">
              <Clock3 className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
              Delais et disponibilite
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Nous faisons au mieux pour repondre sous 48 heures ouvrables. Pour une urgence medicale ou psychologique, contactez immediatement les services d'urgence ou un professionnel de sante.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">France</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service disponible en ligne.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600 dark:text-sky-400" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Lundi - vendredi</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">9h00 - 18h00</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
