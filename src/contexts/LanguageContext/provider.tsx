import { ReactNode, useEffect, useState } from "react";
import { LanguageContext } from "./context";

import { Language } from "types/language";

export const LanguageProvider = ({children}: {children: ReactNode}) => {
    const [language, setLanguage] = useState<Language>("en");

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    useEffect(() => {
        const lang = localStorage.getItem("lang") as Language | null;
        if(lang) setLanguage(lang);
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};