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
  const settings = useScoreStore((state) => state.settings);
  const getLowestPlayer = useScoreStore((state) => state.getLowestPlayer);
  const getHighestPlayer = useScoreStore((state) => state.getHighestPlayer);

  const maxRounds = getMaxRounds();
  const rounds = Math.max(maxRounds + 1, settings.maxVisibleRows);

  // Get lowest/highest players
  const lowestPlayer = settings.highlightScores ? getLowestPlayer() : null;
  const highestPlayer = settings.highlightScores ? getHighestPlayer() : null;

  return (
    <div className="h-full flex flex-col">
      {/* Player Names Header */}
      <div className="bg-forest-dark border-b-2 border-forest-light">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
        >
          {players.map((player, idx) => (
            <input
              key={player.id}
              type="text"
              value={player.name}
              onChange={(e) => updatePlayerName(idx, e.target.value)}
              className="w-full bg-transparent cursor-pointer transition-all focus:outline-none text-center font-bold border-r border-forest-light py-4 px-2"
              style={{
                borderLeftColor: player.color,
                borderLeftWidth: "1px",
                fontSize: `${settings.fontSize}px`,
              }}
              placeholder={`Player ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Score Rows */}
      <div className="flex-1 overflow-y-auto">
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
                    className={`cursor-pointer bg-forest-dark/50 text-center py-3 px-2 font-semibold transition-colors duration-200 min-h-14 flex items-center justify-center border-r border-forest-light/20 ${
                      isActive
                        ? "bg-emerald-600/40 ring-2 ring-emerald-400 ring-inset"
                        : ""
                    }`}
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

      {/* Total Row - Sticky Bottom with Highlight */}
      <div className="border-t-2 border-emerald-500">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
        >
          {players.map((player, idx) => {
            const total = getTotalScore(idx);
            const isLowest = lowestPlayer && lowestPlayer.index === idx;
            const isHighest = highestPlayer && highestPlayer.index === idx;

            let bgColor = "#059669"; // default emerald-700

            if (settings.highlightScores) {
              if (isLowest && lowestPlayer.total !== highestPlayer.total) {
                bgColor = "#ef4444"; // red-500
              } else if (
                isHighest &&
                lowestPlayer.total !== highestPlayer.total
              ) {
                bgColor = "#fbbf24"; // amber-400 (gold)
              }
            }

            return (
              <div
                key={player.id}
                className="text-center py-4 px-2 font-bold transition-colors duration-300"
                style={{
                  fontSize: `${Math.min(settings.fontSize + 4, 34)}px`,
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
