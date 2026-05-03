import Header from "./components/Header";
import ScoreTable from "./components/ScoreTable";
import Numpad from "./components/Numpad";
import Menu from "./components/Menu";
import useScoreStore from "./store/useScoreStore";

function App() {
  const settings = useScoreStore((state) => state.settings);

  const fontFamily =
    settings.fontFamily === "System Default"
      ? "system-ui, -apple-system, sans-serif"
      : settings.fontFamily;

  const bgColor = settings.background === "forest" ? "#1a3d2e" : "#1a1a1a";

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{
        fontFamily,
        backgroundColor: bgColor,
        height: "100dvh",
      }}
    >
      {/* Header - Fixed height */}
      <div className="flex-shrink-0">
        <Header />
      </div>

      {/* Score Table Container - Takes available space, allows Total to flow down */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <ScoreTable />
      </main>

      {/* Numpad - Fixed at bottom, fixed height */}
      <div className="flex-shrink-0">
        <Numpad />
      </div>

      <Menu />
    </div>
  );
}

export default App;
