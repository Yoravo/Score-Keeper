import { Delete, Undo, ArrowRight, CornerDownLeft } from "lucide-react";
import useScoreStore from "../store/useScoreStore";

function Numpad() {
  const appendInput = useScoreStore((state) => state.appendInput);
  const backspace = useScoreStore((state) => state.backspace);
  const clearInput = useScoreStore((state) => state.clearInput);
  const toggleNegative = useScoreStore((state) => state.toggleNegative);
  const enterScore = useScoreStore((state) => state.enterScore);
  const undo = useScoreStore((state) => state.undo);
  const nextPlayer = useScoreStore((state) => state.nextPlayer);

  const handleEnter = () => {
    enterScore();
  };

  return (
    <div className="bg-forest-dark border-t-2 border-forest-light shadow-2xl">
      {/* Numpad Grid */}
      <div className="p-3 grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button onClick={() => appendInput("1")} className="btn-numpad">
          1
        </button>
        <button onClick={() => appendInput("2")} className="btn-numpad">
          2
        </button>
        <button onClick={() => appendInput("3")} className="btn-numpad">
          3
        </button>
        <button
          onClick={backspace}
          className="btn-numpad bg-red-600 hover:bg-red-700 active:bg-red-800"
        >
          <Delete size={20} />
        </button>

        {/* Row 2 */}
        <button onClick={() => appendInput("4")} className="btn-numpad">
          4
        </button>
        <button onClick={() => appendInput("5")} className="btn-numpad">
          5
        </button>
        <button onClick={() => appendInput("6")} className="btn-numpad">
          6
        </button>
        <button
          onClick={undo}
          className="btn-numpad bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
        >
          <Undo size={20} />
        </button>

        {/* Row 3 */}
        <button onClick={() => appendInput("7")} className="btn-numpad">
          7
        </button>
        <button onClick={() => appendInput("8")} className="btn-numpad">
          8
        </button>
        <button onClick={() => appendInput("9")} className="btn-numpad">
          9
        </button>
        <button
          onClick={nextPlayer}
          className="btn-numpad bg-purple-600 hover:bg-purple-700 active:bg-purple-800"
        >
          <ArrowRight size={20} />
        </button>

        {/* Row 4 */}
        <button
          onClick={toggleNegative}
          className="btn-numpad bg-gray-600 hover:bg-gray-700 active:bg-gray-800"
        >
          ±
        </button>
        <button onClick={() => appendInput("0")} className="btn-numpad">
          0
        </button>
        <button
          onClick={clearInput}
          className="btn-numpad bg-gray-600 hover:bg-gray-700 active:bg-gray-800"
        >
          C
        </button>
        <button
          onClick={handleEnter}
          className="btn-numpad bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
        >
          <CornerDownLeft size={20} />
        </button>
      </div>
    </div>
  );
}

export default Numpad;
