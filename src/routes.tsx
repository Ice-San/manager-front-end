import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router';

import { SignInPage } from './pages/signin';
import { DashboardPage } from './pages/dashboard';
import { ProfilePage } from './pages/profile';

export const Routes = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path='/' element={<SignInPage />} />
                <Route path='/account' element={<DashboardPage />} />
                <Route path='/profile' element={<ProfilePage />} />
            </ReactRoutes>
        </BrowserRouter>
    );
} 