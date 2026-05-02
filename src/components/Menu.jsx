import { X, Plus, Minus, RotateCcw, Trash2, FlaskConical } from "lucide-react";
import useScoreStore from "../store/useScoreStore";

const AVAILABLE_FONTS = [
  "System Default",
  "Inter",
  "Roboto",
  "Poppins",
  "Montserrat",
  "JetBrains Mono",
  "Space Grotesk",
];

function Menu() {
  const menuOpen = useScoreStore((state) => state.menuOpen);
  const closeMenu = useScoreStore((state) => state.closeMenu);
  const players = useScoreStore((state) => state.players);
  const settings = useScoreStore((state) => state.settings);

  const addPlayer = useScoreStore((state) => state.addPlayer);
  const removePlayer = useScoreStore((state) => state.removePlayer);
  const newGame = useScoreStore((state) => state.newGame);
  const sampleGame = useScoreStore((state) => state.sampleGame);
  const resetAll = useScoreStore((state) => state.resetAll);
  const toggleScoreHighlight = useScoreStore(
    (state) => state.toggleScoreHighlight,
  );

  const updateSettings = useScoreStore((state) => state.updateSettings);
  const increaseFontSize = useScoreStore((state) => state.increaseFontSize);
  const decreaseFontSize = useScoreStore((state) => state.decreaseFontSize);
  const increaseMaxRows = useScoreStore((state) => state.increaseMaxRows);
  const decreaseMaxRows = useScoreStore((state) => state.decreaseMaxRows);

  const handleNewGame = () => {
    if (
      confirm(
        "Start a new game? Starting a new game will erase all the scores.",
      )
    ) {
      newGame();
      closeMenu();
    }
  };

  const handleSampleGame = () => {
    if (confirm("Reset to sample game?")) {
      sampleGame();
      closeMenu();
    }
  };

  const handleResetAll = () => {
    if (confirm("Reset everything? This will delete all players and scores.")) {
      resetAll();
      closeMenu();
    }
  };

  const handleRemovePlayer = () => {
    if (players.length <= 2) {
      alert("Minimum 2 players required.");
      return;
    }

    // Remove last player if no scores
    const lastPlayerIndex = players.length - 1;
    const lastPlayer = players[lastPlayerIndex];
    const hasScores = lastPlayer.scores.some(
      (score) => score !== undefined && score !== null && score !== 0,
    );

    if (hasScores) {
      alert(
        `Cannot delete ${lastPlayer.name}. Player has scores. Clear all scores first.`,
      );
      return;
    }

    removePlayer(lastPlayerIndex);
  };

  return (
    <>
      {/* Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-forest-dark border-r-2 border-forest-light z-50 transform transition-transform duration-300 overflow-y-auto ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-forest-light sticky top-0 bg-forest-dark z-10">
          <h2 className="text-xl font-bold text-emerald-400">Menu</h2>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-forest-light rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Game Actions */}
          <section>
            <button
              onClick={handleNewGame}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors mb-2"
            >
              <RotateCcw size={20} />
              New Game
            </button>

            <button
              onClick={handleSampleGame}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <FlaskConical size={20} />
              Sample Game
            </button>
          </section>

          {/* Players */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Players: {players.length}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={addPlayer}
                  disabled={players.length >= 8}
                  className={`p-2 rounded-lg transition-colors ${
                    players.length >= 8
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                  title="Add player"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={handleRemovePlayer}
                  disabled={players.length <= 2}
                  className={`p-2 rounded-lg transition-colors ${
                    players.length <= 2
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  title="Remove player"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Rows */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Rows: {settings.maxVisibleRows}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={increaseMaxRows}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  title="Add row"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={decreaseMaxRows}
                  disabled={settings.maxVisibleRows <= 5}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.maxVisibleRows <= 5
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  title="Remove row"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Font */}
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              Font: {settings.fontFamily}
            </h3>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSettings("fontFamily", e.target.value)}
              className="w-full bg-forest-base border border-forest-light rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {AVAILABLE_FONTS.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </section>

          {/* Font Size */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Font Size: {settings.fontSize}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 30}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.fontSize >= 30
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                  title="Increase font size"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 10}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.fontSize <= 10
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  title="Decrease font size"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Background */}
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              Background:{" "}
              {settings.background === "forest" ? "Forest Green" : "Dark Mode"}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSettings("background", "forest")}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  settings.background === "forest"
                    ? "bg-emerald-600 ring-2 ring-emerald-400"
                    : "bg-forest-base hover:bg-forest-light"
                }`}
              >
                Forest Green
              </button>
              <button
                onClick={() => updateSettings("background", "dark")}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  settings.background === "dark"
                    ? "bg-gray-700 ring-2 ring-gray-400"
                    : "bg-forest-base hover:bg-forest-light"
                }`}
              >
                Dark Mode
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">
                  Highlight Scores
                </h3>
                <p className="text-xs text-gray-500">Show lowest/highest</p>
              </div>
              <button
                onClick={toggleScoreHighlight}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.highlightScores ? "bg-emerald-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.highlightScores ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Leaderboard / Email Scores - Placeholder */}
          <section>
            <button
              disabled
              className="w-full bg-gray-600 opacity-50 cursor-not-allowed py-3 rounded-lg font-semibold"
              title="Coming soon"
            >
              Leaderboard / Email Scores
            </button>
            <p className="text-xs text-gray-500 text-center mt-1">
              Coming soon
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-forest-light pt-4">
            <button
              onClick={handleResetAll}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 size={20} />
              Reset All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
