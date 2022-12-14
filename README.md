# movies-explorer-frontend

<img src="https://sereja-art.ru/upload/movies-explorer-portfolio.png" alt="movies-explorer-frontend" title="movies-explorer-frontend" />


Movies Explorer - фронтенд часть моего дипломного проекта и сервис, в котором можно найти фильмы из коллекции BeatFilm и сохранить в избранном. 

<a href="https://movies-expl.nomoredomains.sbs" target="_blank">https://movies-expl.nomoredomains.sbs</a>
<br />

## Функционал 
* Регистрация и авторизация пользователя;
* Изменение данных пользователя;
* Поиск и фильтрация фильмов; 
* Добавление и удаление фильмов из избранного

## Технологии
* Количество карточек фильмов отображается в зависимости от ширины экрана при помощи медиа-запросов; 
* Валидация форм при неправильно введенном логине/пароле;
* `HTML`, `CSS`, `JavaScript`, `React`;
* Защита роутов авторизацией;
* линтер `eslint` по стайлгайду `Airbnb`

## Макет
[Ссылка на дизайн-макет](https://disk.yandex.ru/d/1TRIsfRnB_RPGQ)

## Backend
Бэкенд часть дипломной работы располагается на [Github](https://github.com/sereja-artemov/movies-explorer-api)

## Запуск проекта локально
* `npm run start` - запуск проект в режиме отладки
* `npm run build` - собрать проект
* `npm run lint` - запустить линтер
* `npm run deploy` - собрать проект и отправить на удаленный сервер
