import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from './providers';
import { Routes } from './routes'

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </StrictMode>,
);