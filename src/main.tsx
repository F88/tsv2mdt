import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { inspectViteEnv } from './utils/debug-utils.js';
import { firebaseApp } from './utils/firebase-utils.js';

if (import.meta.env.DEV) {
  inspectViteEnv();
}

console.debug('Firebase initialized:', firebaseApp.options.measurementId);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
