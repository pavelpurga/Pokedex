import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from  './locales/translation.ru.json'
import ua from './locales/translation.ua.json'
import en from './locales/translation.en.json'

i18n
  .use(initReactI18next)
  .init({
    resources:{
      ru: {translation: ru},
      ua: {translation: ua},
      en: {translation: en},
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'ua'],
    react: {
      useSuspense: false,
    },
  });

export default i18n;