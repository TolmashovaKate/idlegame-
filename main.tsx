import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import LoadGame from './game/LoadGame';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Корневой элемент с id 'root' не найден");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <LoadGame />
  </React.StrictMode>
);