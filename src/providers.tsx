import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { LanguageProvider } from 'contexts/LanguageContext';

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <CookiesProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </CookiesProvider>
    );
};