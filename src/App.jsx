import Header from './components/Header';
import ScoreTable from './components/ScoreTable';
import Numpad from './components/Numpad';
import Menu from './components/Menu';
import useScoreStore from './store/useScoreStore';

function App() {
  const settings = useScoreStore((state) => state.settings);

  // Apply font family
  const fontFamily = settings.fontFamily === 'System Default' 
    ? 'system-ui, -apple-system, sans-serif'
    : settings.fontFamily;

  // Apply background color
  const bgColor = settings.background === 'forest' 
    ? '#1a3d2e' 
    : '#1a1a1a';

  return (
    <div 
      className="h-screen flex flex-col overflow-hidden"
      style={{ 
        fontFamily,
        backgroundColor: bgColor,
        // fontSize removed - only apply to table
      }}
    >
      <Header />
      <main className="flex-1 overflow-hidden">
        <ScoreTable />
      </main>
      <Numpad />
      <Menu />
    </div>
  );
}

export default App;