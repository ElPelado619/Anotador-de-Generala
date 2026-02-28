import { useState, useEffect } from 'react';

/**
 * Custom hook para manejar el estado con persistencia en localStorage
 * @param {string} key - La clave del localStorage
 * @param {any} initialValue - Valor inicial si no existe en localStorage
 * @returns {[any, Function]} - [valor, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Estado para almacenar nuestro valor
  // Pasa una función de inicialización al useState para que la lógica solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Obtener del localStorage local por clave
      const item = window.localStorage.getItem(key);
      // Parsear el JSON almacenado o si no existe devolver initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error también devolvemos initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Devuelve una versión envuelta de la función setter de useState que...
  // ...persiste el nuevo valor al localStorage.
  const setValue = (value) => {
    try {
      // Permitir que value sea una función, así tenemos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Guardar estado
      setStoredValue(valueToStore);
      // Guardar al localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Una implementación más avanzada podría manejar el caso de error
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
