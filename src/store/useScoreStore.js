import { create } from "zustand";
import { persist } from "zustand/middleware";

const SAMPLE_PLAYERS = [
  { id: 1, name: "Han", color: "#059669", scores: [] },
  { id: 2, name: "Chewie", color: "#0891b2", scores: [] },
  { id: 3, name: "Luke", color: "#7c3aed", scores: [] },
  { id: 4, name: "Leia", color: "#dc2626", scores: [] },
];

const useScoreStore = create(
  persist(
    (set, get) => ({
      // ========== STATE ==========
      players: [...SAMPLE_PLAYERS],
      currentPlayerIndex: 0,
      currentRoundIndex: 0,
      currentInput: "",
      history: [],
      menuOpen: false,

      // Settings
      settings: {
        fontSize: 20,
        fontFamily: "System Default",
        background: "forest",
        maxVisibleRows: 7,
        highlightScores: false,
      },

      // ========== COMPUTED ==========
      getCurrentPlayer: () => {
        const { players, currentPlayerIndex } = get();
        return players[currentPlayerIndex];
      },

      getTotalScore: (playerIndex) => {
        const { players } = get();
        return players[playerIndex].scores.reduce((sum, score) => {
          return sum + (score || 0);
        }, 0);
      },

      getMaxRounds: () => {
        const { players } = get();
        return Math.max(...players.map((p) => p.scores.length), 0);
      },

      // ========== ACTIONS ==========

      setActiveCell: (playerIndex, roundIndex) => {
        set({
          currentPlayerIndex: playerIndex,
          currentRoundIndex: roundIndex,
          currentInput: "",
        });
      },

      appendInput: (value) => {
        set((state) => {
          const newInput = state.currentInput + value;
          if (newInput.length > 6) return state;

          // Parse and validate
          const score =
            newInput === "" || newInput === "-" ? 0 : parseInt(newInput, 10);

          if (isNaN(score)) return { currentInput: newInput };

          const { currentPlayerIndex, currentRoundIndex, players } = state;

          const newPlayers = players.map((player, idx) => {
            if (idx === currentPlayerIndex) {
              const newScores = [...player.scores];
              while (newScores.length <= currentRoundIndex) {
                newScores.push(undefined);
              }
              newScores[currentRoundIndex] = score;

              return {
                ...player,
                scores: newScores,
              };
            }
            return player;
          });

          // IMPORTANT: Return new state immediately
          return {
            currentInput: newInput,
            players: newPlayers,
          };
        });
      },

      // BACKSPACE FUNCTION - FIXED
      backspace: () => {
        set((state) => {
          if (state.currentInput.length === 0) {
            // If input is empty, clear the cell
            const { currentPlayerIndex, currentRoundIndex, players } = state;

            const newPlayers = players.map((player, idx) => {
              if (idx === currentPlayerIndex) {
                const newScores = [...player.scores];
                if (newScores[currentRoundIndex] !== undefined) {
                  newScores[currentRoundIndex] = undefined;
                }
                return {
                  ...player,
                  scores: newScores,
                };
              }
              return player;
            });

            return {
              players: newPlayers,
              currentInput: "",
            };
          }

          // Remove last character from input
          const newInput = state.currentInput.slice(0, -1);
          const { currentPlayerIndex, currentRoundIndex, players } = state;

          // Update score based on new input
          let score;
          if (newInput === "" || newInput === "-") {
            score = undefined; // Clear cell if input is empty or just minus
          } else {
            score = parseInt(newInput, 10);
          }

          const newPlayers = players.map((player, idx) => {
            if (idx === currentPlayerIndex) {
              const newScores = [...player.scores];
              while (newScores.length <= currentRoundIndex) {
                newScores.push(undefined);
              }
              newScores[currentRoundIndex] =
                isNaN(score) || score === undefined ? undefined : score;

              return {
                ...player,
                scores: newScores,
              };
            }
            return player;
          });

          return {
            currentInput: newInput,
            players: newPlayers,
          };
        });
      },

      clearInput: () => {
        set((state) => {
          const { currentPlayerIndex, currentRoundIndex, players } = state;

          const newPlayers = players.map((player, idx) => {
            if (idx === currentPlayerIndex) {
              const newScores = [...player.scores];
              if (newScores[currentRoundIndex] !== undefined) {
                newScores[currentRoundIndex] = undefined;
              }
              return {
                ...player,
                scores: newScores,
              };
            }
            return player;
          });

          return {
            currentInput: "",
            players: newPlayers,
          };
        });
      },

      toggleNegative: () => {
        set((state) => {
          const input = state.currentInput;
          let newInput;

          if (!input) {
            newInput = "-";
          } else if (input === "-") {
            newInput = "";
          } else if (input.startsWith("-")) {
            newInput = input.substring(1);
          } else {
            newInput = "-" + input;
          }

          const score =
            newInput === "" || newInput === "-" ? 0 : parseInt(newInput, 10);

          if (isNaN(score)) return { currentInput: newInput };

          const { currentPlayerIndex, currentRoundIndex, players } = state;

          const newPlayers = players.map((player, idx) => {
            if (idx === currentPlayerIndex) {
              const newScores = [...player.scores];
              while (newScores.length <= currentRoundIndex) {
                newScores.push(undefined);
              }
              newScores[currentRoundIndex] = score;

              return {
                ...player,
                scores: newScores,
              };
            }
            return player;
          });

          return {
            currentInput: newInput,
            players: newPlayers,
          };
        });
      },

      enterScore: () => {
        set({
          currentInput: "",
        });
      },

      nextPlayer: () => {
        set((state) => {
          let nextPlayerIndex = state.currentPlayerIndex + 1;

          if (nextPlayerIndex >= state.players.length) {
            nextPlayerIndex = 0;
          }

          return {
            currentPlayerIndex: nextPlayerIndex,
            currentInput: "",
          };
        });
      },

      previousPlayer: () => {
        set((state) => {
          let prevPlayerIndex = state.currentPlayerIndex - 1;

          if (prevPlayerIndex < 0) {
            prevPlayerIndex = state.players.length - 1;
          }

          return {
            currentPlayerIndex: prevPlayerIndex,
            currentInput: "",
          };
        });
      },

      updatePlayerName: (playerIndex, name) => {
        set((state) => ({
          players: state.players.map((player, idx) =>
            idx === playerIndex ? { ...player, name } : player,
          ),
        }));
      },

      addPlayer: () => {
        set((state) => {
          if (state.players.length >= 8) return state;

          const colors = [
            "#059669",
            "#0891b2",
            "#7c3aed",
            "#dc2626",
            "#f59e0b",
            "#ec4899",
            "#8b5cf6",
            "#14b8a6",
          ];
          const newId = Math.max(...state.players.map((p) => p.id), 0) + 1;
          const newPlayer = {
            id: newId,
            name: `Player ${newId}`,
            color: colors[state.players.length % colors.length],
            scores: [],
          };
          return {
            players: [...state.players, newPlayer],
          };
        });
      },

      removePlayer: (playerIndex) => {
        set((state) => {
          if (state.players.length <= 2) return state;

          const newPlayers = state.players.filter(
            (_, idx) => idx !== playerIndex,
          );

          return {
            players: newPlayers,
            currentPlayerIndex: Math.min(
              state.currentPlayerIndex,
              newPlayers.length - 1,
            ),
          };
        });
      },

      undo: () => {
        set((state) => {
          const { currentPlayerIndex, currentRoundIndex, players } = state;

          const newPlayers = players.map((player, idx) => {
            if (idx === currentPlayerIndex) {
              const newScores = [...player.scores];
              newScores[currentRoundIndex] = undefined;
              return {
                ...player,
                scores: newScores,
              };
            }
            return player;
          });

          return {
            players: newPlayers,
            currentInput: "",
          };
        });
      },

      toggleScoreHighlight: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            highlightScores: !state.settings.highlightScores,
          },
        }));
      },

      getLowestPlayer: () => {
        const { players } = get();
        if (players.length === 0) return null;

        const scores = players.map((p, idx) => ({
          index: idx,
          total: p.scores.reduce((sum, score) => sum + (score || 0), 0),
        }));

        return scores.reduce((lowest, current) =>
          current.total < lowest.total ? current : lowest,
        );
      },

      getHighestPlayer: () => {
        const { players } = get();
        if (players.length === 0) return null;

        const scores = players.map((p, idx) => ({
          index: idx,
          total: p.scores.reduce((sum, score) => sum + (score || 0), 0),
        }));

        return scores.reduce((highest, current) =>
          current.total > highest.total ? current : highest,
        );
      },

      newGame: () => {
        set((state) => ({
          players: state.players.map((player) => ({
            ...player,
            scores: [],
          })),
          currentPlayerIndex: 0,
          currentRoundIndex: 0,
          currentInput: "",
          history: [],
        }));
      },

      sampleGame: () => {
        set({
          players: [...SAMPLE_PLAYERS],
          currentPlayerIndex: 0,
          currentRoundIndex: 0,
          currentInput: "",
          history: [],
        });
      },

      resetAll: () => {
        set({
          players: [...SAMPLE_PLAYERS],
          currentPlayerIndex: 0,
          currentRoundIndex: 0,
          currentInput: "",
          history: [],
        });
      },

      updateSettings: (key, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        }));
      },

      increaseFontSize: () => {
        set((state) => {
          const newSize = Math.min(state.settings.fontSize + 1, 30);
          return {
            settings: { ...state.settings, fontSize: newSize },
          };
        });
      },

      decreaseFontSize: () => {
        set((state) => {
          const newSize = Math.max(state.settings.fontSize - 1, 10);
          return {
            settings: { ...state.settings, fontSize: newSize },
          };
        });
      },

      increaseMaxRows: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            maxVisibleRows: state.settings.maxVisibleRows + 1,
          },
        }));
      },

      decreaseMaxRows: () => {
        set((state) => {
          const newRows = Math.max(state.settings.maxVisibleRows - 1, 5);
          return {
            settings: { ...state.settings, maxVisibleRows: newRows },
          };
        });
      },

      toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
      closeMenu: () => set({ menuOpen: false }),
    }),
    {
      name: "scorekeeper-storage",
      partialize: (state) => ({
        players: state.players,
        settings: state.settings,
      }),
    },
  ),
);

export default useScoreStore;
