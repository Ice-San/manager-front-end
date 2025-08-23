export type Language = "en" | "pt";

export type LanguageContextType = {
    language: Language,
    changeLanguage: (lang: Language) => void
} | undefined;