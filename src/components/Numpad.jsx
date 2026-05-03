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
    <div className="bg-forest-dark border-t-2 border-forest-light">
      {/* Compact 2-Row Numpad Grid */}
      <div className="grid grid-cols-8 gap-1 p-2">
        {/* Row 1: 1-5 + Actions */}
        <button onClick={() => handleNumberClick('1')} className="numpad-btn" disabled={isProcessing}>1</button>
        <button onClick={() => handleNumberClick('2')} className="numpad-btn" disabled={isProcessing}>2</button>
        <button onClick={() => handleNumberClick('3')} className="numpad-btn" disabled={isProcessing}>3</button>
        <button onClick={() => handleNumberClick('4')} className="numpad-btn" disabled={isProcessing}>4</button>
        <button onClick={() => handleNumberClick('5')} className="numpad-btn" disabled={isProcessing}>5</button>
        <button onClick={backspace} className="numpad-btn numpad-btn-danger">
          <Delete size={16} />
        </button>
        <button onClick={undo} className="numpad-btn numpad-btn-warning">
          <Undo size={16} />
        </button>
        <button onClick={nextPlayer} className="numpad-btn numpad-btn-purple">
          <ArrowRight size={16} />
        </button>

        {/* Row 2: 6-0 + Actions */}
        <button onClick={() => handleNumberClick('6')} className="numpad-btn" disabled={isProcessing}>6</button>
        <button onClick={() => handleNumberClick('7')} className="numpad-btn" disabled={isProcessing}>7</button>
        <button onClick={() => handleNumberClick('8')} className="numpad-btn" disabled={isProcessing}>8</button>
        <button onClick={() => handleNumberClick('9')} className="numpad-btn" disabled={isProcessing}>9</button>
        <button onClick={() => handleNumberClick('0')} className="numpad-btn" disabled={isProcessing}>0</button>
        <button onClick={toggleNegative} className="numpad-btn numpad-btn-gray">±</button>
        <button onClick={clearInput} className="numpad-btn numpad-btn-gray">C</button>
        <button onClick={enterScore} className="numpad-btn numpad-btn-success">
          <CornerDownLeft size={16} />
        </button>
      </div>
    </div>
  );
}

export default Numpad;