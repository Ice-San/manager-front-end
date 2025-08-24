import { Language } from "types/language";

export type LanguageContextType = {
    language: Language,
    changeLanguage: (lang: Language) => void
} | undefined;