import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import logVitals from './services/utilities/vitals.service';

const root: HTMLElement | null = document.querySelector('#root');

root !== null &&
  createRoot(root).render(
    <React.StrictMode>
      <main key="__approot">
        <App />
      </main>
    </React.StrictMode>,
  );

export default void logVitals(console.info);
