import { useState, useRef } from "react";
import useScoreStore from "../store/useScoreStore";

function ScoreTable() {
  const players = useScoreStore((state) => state.players);
  const currentPlayerIndex = useScoreStore((state) => state.currentPlayerIndex);
  const currentRoundIndex = useScoreStore((state) => state.currentRoundIndex);
  const getTotalScore = useScoreStore((state) => state.getTotalScore);
  const getMaxRounds = useScoreStore((state) => state.getMaxRounds);
  const setActiveCell = useScoreStore((state) => state.setActiveCell);
  const currentInput = useScoreStore((state) => state.currentInput);
  const updatePlayerName = useScoreStore((state) => state.updatePlayerName);
  const resetPlayerScores = useScoreStore((state) => state.resetPlayerScores);
  const settings = useScoreStore((state) => state.settings);
  const getLowestPlayer = useScoreStore((state) => state.getLowestPlayer);
  const getHighestPlayer = useScoreStore((state) => state.getHighestPlayer);

  const maxRounds = getMaxRounds();
  const rounds = Math.max(maxRounds + 1, settings.maxVisibleRows);

  const lowestPlayer = settings.highlightScores ? getLowestPlayer() : null;
  const highestPlayer = settings.highlightScores ? getHighestPlayer() : null;

  // Long press handling
  const longPressTimerRef = useRef(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const handleLongPressStart = (playerIndex) => {
    // Clear any existing timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    setIsLongPressing(true);

    // Set timer for long press
    longPressTimerRef.current = setTimeout(() => {
      const player = players[playerIndex];
      const hasScores = player.scores.some(
        (s) => s !== undefined && s !== null && s !== 0,
      );

      if (hasScores) {
        const confirmed = confirm(`Reset all scores for ${player.name}?`);
        if (confirmed) {
          resetPlayerScores(playerIndex);
        }
      } else {
        alert(`${player.name} has no scores to reset.`);
      }

      setIsLongPressing(false);
    }, 600); // 600ms for long press
  };

  const handleLongPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setIsLongPressing(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Player Names Header */}
      <div className="bg-forest-dark border-b-2 border-forest-light shrink-0">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
        >
          {players.map((player, idx) => (
            <div key={player.id} className="relative">
              <input
                type="text"
                value={player.name}
                onChange={(e) => updatePlayerName(idx, e.target.value)}
                onTouchStart={() => handleLongPressStart(idx)}
                onTouchEnd={handleLongPressEnd}
                onTouchMove={handleLongPressEnd}
                onMouseDown={() => handleLongPressStart(idx)}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                className={`w-full bg-transparent cursor-pointer transition-all focus:outline-none text-center font-bold border-r border-forest-light py-3 px-1 ${
                  isLongPressing ? "scale-95" : ""
                }`}
                style={{
                  borderLeftColor: player.color,
                  borderLeftWidth: "1px",
                  fontSize: `${settings.fontSize}px`,
                }}
                placeholder={`Player ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Score Rows */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div>
          {Array.from({ length: rounds }).map((_, roundIdx) => (
            <div
              key={roundIdx}
              className="grid border-b border-forest-light/30"
              style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
            >
              {players.map((player, playerIdx) => {
                const score = player.scores[roundIdx];
                const isActive =
                  playerIdx === currentPlayerIndex &&
                  roundIdx === currentRoundIndex;

                return (
                  <div
                    key={player.id}
                    className={`cell-score cursor-pointer ${isActive ? "cell-active" : ""}`}
                    onClick={() => setActiveCell(playerIdx, roundIdx)}
                    style={{ fontSize: `${settings.fontSize}px` }}
                  >
                    {isActive && currentInput !== "" ? (
                      <span className="text-emerald-300">{currentInput}</span>
                    ) : score !== undefined && score !== null ? (
                      score
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Total Row - Sticky Bottom */}
      <div className="border-t-2 border-emerald-500 shrink-0">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
        >
          {players.map((player, idx) => {
            const total = getTotalScore(idx);
            const isLowest = lowestPlayer && lowestPlayer.index === idx;
            const isHighest = highestPlayer && highestPlayer.index === idx;

            let bgColor = "#059669";

            if (settings.highlightScores) {
              if (isLowest && lowestPlayer.total !== highestPlayer.total) {
                bgColor = "#ef4444";
              } else if (
                isHighest &&
                lowestPlayer.total !== highestPlayer.total
              ) {
                bgColor = "#fbbf24";
              }
            }

            return (
              <div
                key={player.id}
                className="text-center py-3 px-1 font-bold transition-colors duration-300"
                style={{
                  fontSize: `${Math.min(settings.fontSize + 2, 28)}px`,
                  backgroundColor: bgColor,
                }}
              >
                {total}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ScoreTable;
