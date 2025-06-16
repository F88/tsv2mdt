import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

function inspectViteEnv() {
  console.debug(`Vite Environment Variables - Built-in Constants:
import.meta.env.MODE: ${import.meta.env.MODE}
import.meta.env.BASE_URL: ${import.meta.env.BASE_URL}
import.meta.env.PROD: ${String(import.meta.env.PROD)}
import.meta.env.DEV: ${String(import.meta.env.DEV)}
import.meta.env.SSR: ${String(import.meta.env.SSR)}
`);
}
if (import.meta.env.DEV) {
  inspectViteEnv();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
