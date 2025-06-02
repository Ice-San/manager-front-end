import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import { SignInPage } from './pages/signin';
import { SignUpPage } from './pages/signup';
import { AccountPage } from './pages/account';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);