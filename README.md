# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Cхема проекта
При переходе по ссылки : https://drive.google.com/file/d/1iTYSfZzsEdM217wgPc_qx8JMDnFhwxUD/view
Нужно нажать на кнопку 'Открыть в приложение "draw.io"'. После этого откроется сайт с UML схемой проекта.

## Описание классов

```

Класс Model<T>
Абстрактные класс дженери, конструктор, метод привязки события.
### Конструктор
- принимает на вход IEvent (обьект события) и обьект данных.
- проихводит соеденение обьектов.
### методы:
- emmitChanges - регестрирует входящее событие в EventEmitter
