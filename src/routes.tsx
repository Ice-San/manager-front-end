import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router';

import { SignInPage } from './pages/signin';
import { DashboardPage } from './pages/dashboard';

export const Routes = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path='/' element={<SignInPage />} />
                <Route path='/account' element={<DashboardPage />} />
            </ReactRoutes>
        </BrowserRouter>
    );
} 