import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    );
};