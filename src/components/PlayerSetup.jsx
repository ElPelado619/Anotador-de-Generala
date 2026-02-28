import { useState } from 'react';

/**
 * Componente para configurar los jugadores al inicio del juego
 * @param {Function} onStartGame - Callback que recibe el array de jugadores
 * @param {Function} onContinueGame - Callback para continuar partida con jugadores actuales
 * @param {Array} previousPlayers - Array de nombres de jugadores de la partida anterior
 * @param {boolean} hasSavedGame - Indica si hay una partida guardada que se puede continuar
 */
export default function PlayerSetup({ onStartGame, onContinueGame, previousPlayers, hasSavedGame }) {
  const [players, setPlayers] = useState(previousPlayers || ['']);

  const handleAddPlayer = () => {
    if (players.length < 7) {
      setPlayers([...players, '']);
    }
  };

  const handleRemovePlayer = (index) => {
    if (players.length > 1) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    }
  };

  const handlePlayerNameChange = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validPlayers = players.filter(name => name.trim() !== '');
    
    if (validPlayers.length === 0) {
      alert('Por favor, ingresa al menos un jugador');
      return;
    }

    // Si hay una partida guardada, confirmar antes de borrarla
    if (hasSavedGame) {
      if (!window.confirm('¿Estás seguro de que quieres iniciar una nueva partida? Se perderán los puntajes de la partida actual.')) {
        return;
      }
    }

    onStartGame(validPlayers);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold text-center justify-center mb-4">
            🎲 Anotador de Generala
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {players.map((player, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Jugador ${index + 1}`}
                    className="input input-bordered flex-1"
                    value={player}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    maxLength={20}
                  />
                  {players.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-error btn-square"
                      onClick={() => handleRemovePlayer(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {players.length < 7 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddPlayer}
                >
                  + Agregar Jugador
                </button>
              )}

              <button
                type="button"
                className={`btn btn-lg ${hasSavedGame ? 'btn-success' : 'btn-disabled'}`}
                onClick={onContinueGame}
                disabled={!hasSavedGame}
              >
                Continuar Partida
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                {previousPlayers ? 'Iniciar Nueva Partida' : 'Iniciar Partida'}
              </button>
            </div>

            <div className="text-sm text-center text-base-content/60">
              {players.length}/7 jugadores
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
