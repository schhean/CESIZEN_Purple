import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-default-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LOGO CESIZEN */}
        <div className="flex items-center font-bold text-inherit text-xl">
          <span className="">CESI</span>
          <span className="text-purple-500">ZEN</span>
        </div>

        {/* COPYRIGHT */}
        <p className="text-xs text-default-500">
          © {new Date().getFullYear()} CesiZen. Tous droits réservés.
        </p>

        {/* LIENS MINI */}
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-default-500 hover:text-green-600">
            Confidentialité
          </Link>
          <Link href="#" className="text-xs text-default-500 hover:text-green-600">
            Contact
          </Link>
        </div>

      </div>
    </footer>
  );
}