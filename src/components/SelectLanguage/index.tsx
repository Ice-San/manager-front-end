import i18n from "i18n";
import languages from '@data/languages.json';

import { useLanguage } from "contexts/LanguageContext";
import { Language } from "types/language";

import './index.css';

export const SelectLanguage = () => {
    const { language, changeLanguage } = useLanguage()

    return (
        <select
            id="language"
            value={language}
            onChange={(e) => {
                const lang = e.target.value as Language;
                i18n.changeLanguage(e.target.value);
                changeLanguage(lang);
            }}
        >
            {languages.map(({ name, code }) => (
                <option key={code} value={code}>{name} ({code})</option>
            ))}
        </select>
    );
}