import i18n from "i18n";
import languages from '@data/languages.json';

export const SelectLanguage = () => {
    return (
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {languages.map(({ name, code }) => (
                <option key={code} value={code}>{name} ({code})</option>
            ))}
        </select>
    );
}