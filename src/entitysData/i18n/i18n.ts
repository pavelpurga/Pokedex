import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Pokedex": "Pokedex",
      "Home": "Home",
      "Posts":"Posts",
      "Add Pokemon":"Add Pokemon",
      "Adding Pokemons":"Adding Pokemons",
      "Name": "Name",
      "Type/s":"Type/s",
      "Stats(through comma)":"Stats(through comma)",
      "Moves(through comma)":"Moves(through comma)",
      'Image(URL)':'Картинка(URL)',
      "normal":"normal",
      "fire": "fire",
      "water": "water",
      "grass": "grass",
      "electric": "electric",
      "ice": "ice",
      "fighting": "fighting",
      "poison": "poison",
      "ground": "ground",
      "flying": "flying",
      "psychic": "psychic",
      "bug": "bug",
      "rock": "rock",
      "ghost": "ghost",
      "dragon": "dragon",
      "dark": "dark",
      "steel": "steel",
      "fairy": "fairy",
      "This application was developed for educational purposes, the first task.":
          "This application was developed for educational purposes, the first task.",
      "Add new post in local":"Add new post in local",
      "Title":"Title",
      "Body":"Body",
      "Adding posts":"Adding posts",
      "Add post": "Add post"
    }
  },
  ru: {
    translation: {
      "Pokedex": "Покедекс",
      "Home": "Домой",
      "Posts":"Посты",
      "Add Pokemon":"Добавить покемона",
      "Adding Pokemons":"Добавление покемонов",
      "Name": "Имя",
      "Type/s":"Тип/типы",
      "Stats(through comma)":"Статы(через запятую)",
      "Moves(through comma)":"Способности(через запятую)",
      'Image(URL)':'Картинка(URL)',
      "normal":"норм",
      "fire": "огонь",
      "water": "вода",
      "grass": "трава",
      "electric": "электричество",
      "ice": "лёд",
      "fighting": "физуха",
      "poison": "яд",
      "ground": "земля",
      "flying": "вода",
      "psychic": "психо",
      "bug": "жук",
      "rock": "камень",
      "ghost": "приведение",
      "dragon": "дракон",
      "dark": "тьма",
      "steel": "сталь",
      "fairy": "волшебный",
      "This application was developed for educational purposes, the first task.":
          "Данное приложение было разработано в образовательных целях, первая таска",
      "Add new post in local":"Добавить новый пост",
      "Title":"Заголовок поста",
      "Body":"Содержимое поста",
      "Adding posts":"Добавление постов",
      "Add post": "Добавить пост"
    }
  },
  ua:{
    translation:{
      "Pokedex": "Покедекс",
      "Home": "Додому",
      "Posts": "Пости",
      "Add Pokemon":"Додати покемона",
      "Adding Pokemons":"Додавання покимонiв",
      "Name": "Назва",
      "Type/s":"Тип/и",
      "Stats(through comma)":"Статы(через запятую)",
      "Moves(through comma)":"Стати(через кому)",
      'Image(URL)':'Малюнок(URL)',
      "normal":"нормальний",
      "fire": "вогонь",
      "water": "вода",
      "grass": "трава",
      "electric": "электрика",
      "ice": "лiд",
      "fighting": "фiзичний",
      "poison": "отрута",
      "ground": "земля",
      "flying": "полiт",
      "psychic": "психiчний",
      "bug": "жук",
      "rock": "камiнь",
      "ghost": "приведення",
      "dragon": "дракон",
      "dark": "темрява",
      "steel": "сталь",
      "fairy": "чарiвний",
      "This application was developed for educational purposes, the first task.":
          "Данное приложение было разработано в образовательных целях, первая таска",
      "Add new post in local":"Додати новий пост",
      "Title":"Заголовок посту",
      "Body":"Вмiст посту",
      "Adding posts":"Додавання постiв",
      "Add post": "Додати пост"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'ua'],
    react: {
      useSuspense: false,
    },
  });

export default i18n;