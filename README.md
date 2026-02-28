# 🎲 Generala - Anotador de Puntajes

Jugá acá: [https://elpelado619.github.io/Anotador-de-Generala/](https://elpelado619.github.io/Anotador-de-Generala/)



## 🚀 Características

WebApp mobile-first para anotar puntos del juego de Generala.

- ✅ Podés agregar de 1 a 7 jugadores
- ✅ Tablero responsivo con DaisyUI
- ✅ Modal interactivo para ingresar puntajes
- ✅ Cálculo automático de totales
- ✅ Persistencia de datos con localStorage
- ✅ Diseño mobile-first

## 🛠️ Tecnologías utilizadas

- React 18
- Vite
- Tailwind CSS
- DaisyUI


## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── PlayerSetup.jsx    # Configuración inicial
│   ├── GameBoard.jsx      # Tablero de juego
│   └── ScoreModal.jsx     # Modal de puntajes
├── hooks/
│   └── useLocalStorage.js # Hook de persistencia
├── App.jsx                # Componente principal
├── main.jsx              # Entry point
└── index.css             # Estilos Tailwind
```

## 🎨 Personalización

Podés cambiar el tema en `index.html`:
```html
<html data-theme="retro">  <!-- o "cupcake" -->
```

O editar los temas disponibles en `tailwind.config.js`.
