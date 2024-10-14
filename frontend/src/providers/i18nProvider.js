import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from './spanishMessages';  // Importa las traducciones

export const i18nProvider = polyglotI18nProvider(() => spanishMessages, 'es');  // Idioma por defecto: español