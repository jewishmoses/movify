import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HE from './src/resources/language/he.json';

const resources = {
    he: {
        translation: HE
    },
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: "he", 
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;