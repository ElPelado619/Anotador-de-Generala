# 🎲 Generala - Anotador de Puntajes

WebApp mobile-first para anotar puntos del juego de Generala.

## 🚀 Características

- ✅ Agregar de 1 a 7 jugadores
- ✅ Tablero responsivo con DaisyUI
- ✅ Modal interactivo para ingresar puntajes
- ✅ Cálculo automático de subtotales y totales
- ✅ Persistencia de datos con localStorage
- ✅ Diseño mobile-first

## 🛠️ Tecnologías

- React 18
- Vite
- Tailwind CSS
- DaisyUI

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📱 Despliegue

El proyecto está configurado para desplegarse en GitHub Pages. El `base` path en `vite.config.js` está configurado como `/Generala/`. 

Para desplegar:

1. Crea un repositorio en GitHub llamado "Generala"
2. Push tu código al repositorio
3. Ejecuta el build: `npm run build`
4. Despliega la carpeta `dist` a GitHub Pages

O usa gh-pages:

```bash
npm install -D gh-pages
```

Agrega en `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

Luego ejecuta:
```bash
npm run deploy
```

## 🎮 Cómo Jugar

1. **Configurar Jugadores**: Ingresa los nombres de 1 a 7 jugadores
2. **Iniciar Partida**: Haz clic en "Iniciar Partida"
3. **Anotar Puntajes**: Toca una celda vacía para abrir el modal
4. **Seleccionar Puntaje**: Elige entre las opciones disponibles
5. **Ganar**: El jugador con más puntos al final gana

## 📋 Reglas de Puntaje

### Números (1-6)
- 0, 1, 2, 3, 4, 5 dados del número

### Jugadas Especiales
- **Escalera**: 20 (armada) / 25 (servida)
- **Full**: 30 (armado) / 35 (servido)
- **Póker**: 40 (armado) / 45 (servido)
- **Generala**: 50 (servida)
- **Doble Generala**: 100 (si ya tienes Generala)

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

Puedes cambiar el tema en `index.html`:
```html
<html data-theme="retro">  <!-- o "cupcake" -->
```

O editar los temas disponibles en `tailwind.config.js`.

## 📝 Licencia

MIT
