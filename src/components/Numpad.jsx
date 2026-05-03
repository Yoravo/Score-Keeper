import { Delete, Undo, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useState } from 'react';
import useScoreStore from '../store/useScoreStore';

function Numpad() {
  const appendInput = useScoreStore((state) => state.appendInput);
  const backspace = useScoreStore((state) => state.backspace);
  const clearInput = useScoreStore((state) => state.clearInput);
  const toggleNegative = useScoreStore((state) => state.toggleNegative);
  const enterScore = useScoreStore((state) => state.enterScore);
  const undo = useScoreStore((state) => state.undo);
  const nextPlayer = useScoreStore((state) => state.nextPlayer);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleNumberClick = (num) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    appendInput(num);
    
    setTimeout(() => {
      setIsProcessing(false);
    }, 100);
  };

  return (
    <div className="bg-forest-dark border-t-2 border-forest-light shadow-2xl safe-area-bottom">
      {/* Numpad Grid - RESPONSIVE */}
      <div className="p-2 sm:p-3 grid grid-cols-4 gap-2 max-w-md mx-auto">
        {/* Row 1 */}
        <button onClick={() => handleNumberClick('1')} className="btn-numpad" disabled={isProcessing}>1</button>
        <button onClick={() => handleNumberClick('2')} className="btn-numpad" disabled={isProcessing}>2</button>
        <button onClick={() => handleNumberClick('3')} className="btn-numpad" disabled={isProcessing}>3</button>
        <button onClick={backspace} className="btn-numpad bg-red-600 hover:bg-red-700 active:bg-red-800">
          <Delete size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Row 2 */}
        <button onClick={() => handleNumberClick('4')} className="btn-numpad" disabled={isProcessing}>4</button>
        <button onClick={() => handleNumberClick('5')} className="btn-numpad" disabled={isProcessing}>5</button>
        <button onClick={() => handleNumberClick('6')} className="btn-numpad" disabled={isProcessing}>6</button>
        <button onClick={undo} className="btn-numpad bg-orange-600 hover:bg-orange-700 active:bg-orange-800">
          <Undo size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Row 3 */}
        <button onClick={() => handleNumberClick('7')} className="btn-numpad" disabled={isProcessing}>7</button>
        <button onClick={() => handleNumberClick('8')} className="btn-numpad" disabled={isProcessing}>8</button>
        <button onClick={() => handleNumberClick('9')} className="btn-numpad" disabled={isProcessing}>9</button>
        <button onClick={nextPlayer} className="btn-numpad bg-purple-600 hover:bg-purple-700 active:bg-purple-800">
          <ArrowRight size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Row 4 */}
        <button onClick={toggleNegative} className="btn-numpad bg-gray-600 hover:bg-gray-700 active:bg-gray-800">
          ±
        </button>
        <button onClick={() => handleNumberClick('0')} className="btn-numpad" disabled={isProcessing}>0</button>
        <button onClick={clearInput} className="btn-numpad bg-gray-600 hover:bg-gray-700 active:bg-gray-800">
          C
        </button>
        <button onClick={enterScore} className="btn-numpad bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800">
          <CornerDownLeft size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default Numpad;