import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GameProvider } from './context/GameContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <GameProvider>
      <App />
    </GameProvider>
  </DndProvider>
);
