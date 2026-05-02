import { Menu } from 'lucide-react';
import useScoreStore from '../store/useScoreStore';

function Header() {
  const toggleMenu = useScoreStore((state) => state.toggleMenu);

  return (
    <header className="bg-forest-dark border-b border-forest-light py-4 px-4 flex items-center justify-between sticky top-0 z-20 shadow-lg">
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-forest-light rounded-lg transition-colors"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>
      
      <h1 className="text-2xl font-bold text-emerald-400">
        ScoreKeeper
      </h1>
      
      <div className="w-10" /> {/* Spacer for centering */}
    </header>
  );
}

export default Header;