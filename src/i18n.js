import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import nav from "./locales/nav";
import footer from "./locales/footer";
import home from "./locales/home";

const resources = {
  en: {
    translation: {
      ...nav.en.translation,
      ...footer.en.translation,
      ...home.en.translation,
    },
  },
  ar: {
    translation: {
      ...nav.ar.translation,
      ...footer.ar.translation,
      ...home.ar.translation,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  // .use(HttpBackend)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
