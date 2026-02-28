import { useState } from 'react';
import ScoreModal from './ScoreModal';

// Categorías del juego en orden
const CATEGORIES = [
  '1', '2', '3', '4', '5', '6',
  'Escalera', 'Full', 'Póker', 'Generala', 'Doble Generala'
];

/**
 * Componente del tablero de juego
 * @param {Array} players - Array de nombres de jugadores
 * @param {Object} gameState - Estado del juego
 * @param {Function} onScoreUpdate - Callback para actualizar un puntaje
 * @param {Function} onResetGame - Callback para resetear el juego
 */
export default function GameBoard({ players, gameState, onScoreUpdate, onResetGame }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ playerIndex: null, category: null });

  const handleCellClick = (playerIndex, category) => {
    // Permitir editar cualquier celda
    setSelectedCell({ playerIndex, category });
    setModalOpen(true);
  };

  const handleScoreSubmit = (score) => {
    onScoreUpdate(selectedCell.playerIndex, selectedCell.category, score);
  };

  const calculateTotal = (playerScores) => {
    let total = 0;
    
    CATEGORIES.forEach(category => {
      const score = playerScores[category];
      if (score !== null) {
        total += score;
      }
    });

    return total;
  };

  const handleResetConfirm = () => {
    onResetGame();
  };

  return (
    <div className="min-h-screen p-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">🎲 Anotador de Generala</h1>
          <button 
            className="btn btn-warning btn-sm"
            onClick={handleResetConfirm}
          >
            Volver
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-base-100 rounded-lg shadow-xl">
          <table className="table table-zebra table-pin-rows w-full table-fixed">
            <thead>
              <tr>
                <th className="bg-neutral text-neutral-content text-xs md:text-sm font-bold border-r border-neutral-content/20 px-1 md:px-3"></th>
                {players.map((player, index) => (
                  <th key={index} className="bg-neutral text-neutral-content text-center text-xs md:text-sm font-bold border-r border-neutral-content/20 px-1 md:px-3">
                    <span className="block truncate">{player}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((category) => (
                <tr key={category}>
                  <td className="font-semibold text-xs md:text-sm border-r border-base-content/10 px-1 md:px-3 py-2">
                    <span className="block truncate">{category}</span>
                  </td>
                  {players.map((player, playerIndex) => {
                    const score = gameState[playerIndex][category];
                    const isEmpty = score === null;
                    
                    return (
                      <td
                        key={playerIndex}
                        className="text-center cursor-pointer hover:bg-base-300 active:bg-base-200 border-r border-base-content/10 px-1 md:px-3 py-2"
                        onClick={() => handleCellClick(playerIndex, category)}
                      >
                        {isEmpty ? (
                          <span className="text-base-content/30 text-sm md:text-base">-</span>
                        ) : (
                          <span className={`text-sm md:text-base ${score === 0 ? 'text-error font-bold' : 'font-bold'}`}>
                            {score === 0 ? '✕' : score}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Total */}
              <tr className="font-bold text-sm md:text-lg">
                <td className="bg-accent text-primary-content border-r border-primary-content/20 px-1 md:px-3 py-2">TOTAL</td>
                {players.map((player, playerIndex) => (
                  <td key={playerIndex} className="bg-accent text-primary-content text-center border-r border-primary-content/20 px-1 md:px-3 py-2">
                    {calculateTotal(gameState[playerIndex])}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instrucciones */}
        <div className="mt-4 text-center text-sm text-base-content/60">
          Toca una celda para ingresar el puntaje
        </div>
      </div>

      {/* Modal */}
      <ScoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleScoreSubmit}
        category={selectedCell.category}
        playerName={players[selectedCell.playerIndex]}
      />
    </div>
  );
}
