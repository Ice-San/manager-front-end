import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { SignInPage } from './pages/signin';
import { SignUpPage } from './pages/signup';
import { AccountPage } from './pages/account';
import './styles/index.css';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(SignInPage, {}) }), _jsx(Route, { path: '/signup', element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: '/account', element: _jsx(AccountPage, {}) })] }) }) }));
