import { createI18n } from 'vue-i18n';
import en from './locales/en.json'; // archivo de traducción en inglés
import es from './locales/es.json'; // archivo de traducción en español

const messages = {
    en: en,
    es: es,
};

const i18n = createI18n({
    locale: 'en', // idioma por defecto
    fallbackLocale: 'en', // idioma de respaldo si no se encuentra la traducción
    messages, // tus mensajes de traducción
});

export default i18n;
