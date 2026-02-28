import { useEffect } from 'react';

/**
 * Obtiene las opciones de puntaje para una categoría
 * @param {string} category - La categoría del puntaje
 * @returns {Array} - Array de objetos con label y value
 */
function getScoreOptions(category) {
  const numberCategories = ['1', '2', '3', '4', '5', '6'];
  
  if (numberCategories.includes(category)) {
    const num = parseInt(category);
    return [
      { label: 'Vacio', value: null },  
      { label: 'Tachado', value: 0 },
      { label: num.toString(), value: num },
      { label: (num * 2).toString(), value: num * 2 },
      { label: (num * 3).toString(), value: num * 3 },
      { label: (num * 4).toString(), value: num * 4 },
      { label: (num * 5).toString(), value: num * 5 },
    ];
  }

  switch (category) {
    case 'Escalera':
      return [
        { label: 'Vacio', value: null },
        { label: 'Tachado', value: 0 },
        { label: 'Armada (20)', value: 20 },
        { label: 'Servida (25)', value: 25 },
      ];
    case 'Full':
      return [
        { label: 'Vacio', value: null },
        { label: 'Tachado', value: 0 },
        { label: 'Armado (30)', value: 30 },
        { label: 'Servido (35)', value: 35 },
      ];
    case 'Póker':
      return [
        { label: 'Vacio', value: null },
        { label: 'Tachado', value: 0 },
        { label: 'Armado (40)', value: 40 },
        { label: 'Servido (45)', value: 45 },
      ];
    case 'Generala':
      return [
        { label: 'Vacio', value: null },
        { label: 'Tachado', value: 0 },
        { label: 'Armado (50)', value: 50 },
      ];
    case 'Doble Generala':
      return [
        { label: 'Vacio', value: null },
        { label: 'Tachado', value: 0 },
        { label: 'Doble Generala (100)', value: 100 },
      ];
    default:
      return [];
  }
}

/**
 * Modal para ingresar el puntaje de una jugada
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Callback para cerrar el modal
 * @param {Function} onSubmit - Callback al seleccionar un puntaje
 * @param {string} category - Categoría actual
 * @param {string} playerName - Nombre del jugador
 */
export default function ScoreModal({ isOpen, onClose, onSubmit, category, playerName }) {
  const options = getScoreOptions(category);

  useEffect(() => {
    const modalElement = document.getElementById('score_modal');
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  const handleOptionClick = (value) => {
    onSubmit(value);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="score_modal" className="modal" onClick={handleBackdropClick}>
      <div className="modal-box">
        <h2 className="font-bold text-2xl mb-3">
          {category}
        </h2>
        <h3 className="text-l opacity-70 mb-4">
          {playerName}
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {options.map((option, index) => (
            <button
              key={index}
              className={`btn ${
                option.value === 0 
                  ? 'btn-error' 
                  : option.label.includes('Servid') 
                    ? 'btn-info' 
                    : option.label.includes('Vacio')
                    ? 'btn-neutral'
                    : 'btn-accent'
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="modal-action">
          <button className="btn btn-neutral" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
