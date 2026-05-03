import { Menu } from "lucide-react";
import useScoreStore from "../store/useScoreStore";

function Header() {
  const toggleMenu = useScoreStore((state) => state.toggleMenu);

  return (
    <header className="bg-forest-dark border-b border-forest-light py-3 px-3 sm:py-4 sm:px-4 flex items-center justify-between sticky top-0 z-20 shadow-lg safe-area-top">
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-forest-light rounded-lg transition-colors"
        aria-label="Menu"
      >
        <Menu size={22} className="sm:w-6 sm:h-6" />
      </button>

      <h1 className="text-xl sm:text-2xl font-bold text-emerald-400">
        ScoreKeeper
      </h1>

      <div className="w-10" />
    </header>
  );
}

export default Header;
