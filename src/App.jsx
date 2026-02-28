import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';

/**
 * Inicializa el estado del juego para un conjunto de jugadores
 * @param {Array} players - Array de nombres de jugadores
 * @returns {Array} - Array de objetos de puntajes por jugador
 */
function initializeGameState(players) {
  return players.map(() => ({
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    'Escalera': null,
    'Full': null,
    'Póker': null,
    'Generala': null,
    'Doble Generala': null,
  }));
}

function App() {
  const [players, setPlayers] = useLocalStorage('generala-players', null);
  const [gameState, setGameState] = useLocalStorage('generala-state', null);
  const [showSetup, setShowSetup] = useState(!players);

  const handleStartGame = (playerNames) => {
    setPlayers(playerNames);
    setGameState(initializeGameState(playerNames));
    setShowSetup(false);
  };

  const handleScoreUpdate = (playerIndex, category, score) => {
    const newGameState = [...gameState];
    newGameState[playerIndex] = {
      ...newGameState[playerIndex],
      [category]: score,
    };
    setGameState(newGameState);
  };

  const handleResetGame = () => {
    // Vuelve a la pantalla de setup sin borrar nada
    setShowSetup(true);
  };

  const handleContinueGame = () => {
    // Vuelve al tablero con el estado guardado
    setShowSetup(false);
  };

  // Si no hay jugadores configurados o se está en la pantalla de setup
  if (showSetup || !players) {
    return (
      <PlayerSetup 
        onStartGame={handleStartGame}
        onContinueGame={handleContinueGame}
        previousPlayers={players}
        hasSavedGame={gameState !== null}
      />
    );
  }

  // Si por alguna razón no hay gameState pero sí players, inicializar
  if (!gameState) {
    setGameState(initializeGameState(players));
    return null;
  }

  // Si hay jugadores, mostrar el tablero
  return (
    <GameBoard
      players={players}
      gameState={gameState}
      onScoreUpdate={handleScoreUpdate}
      onResetGame={handleResetGame}
    />
  );
}

export default App;
