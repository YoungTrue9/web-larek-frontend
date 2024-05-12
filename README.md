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



### Класс Model<T>
Абстрактный класс дженерик, конструктор, метод привязки события.
#### Конструктор:
- принимает на вход IEvent (обьект события) и обьект данных.
- проихводит соеденение обьектов.
#### методы:
- emmitChanges - регестрирует входящее событие в EventEmitter



### Класс Component<T>
Абстрактный класс дженерик, работает с конструктор и с компонентами отображения для сайта.
#### Конструктор:
- принимает на вхождение container с типом HTMLElement
#### Методы:
- ```toggleClass``` -- метод переключения класса элемента
- ```setDisabled``` -- метод нужный для блокировки кнопки
- ```render``` -- метод соеденения дынных для отрисовки элементов
- ```setImage``` -- метод для инициализации изображения и описания
- ```setText``` -- метод для инициализации текста элементов



### Класс ```EventEmitter```
Класс ```EventEmitter``` занимется работай событий. Можно устанавливать и снимать прослушивания события. 



### Класс ```Api```
Хранит главные основные методы и поля для работы с сервером.
Хранит ```baseUrl```, ```options```
```baseUrl``` -- ссылка (url)
```options``` -- запрос
Производит обработку запроса и получение данных.


### Model - компоненты
Класс ```LarekApi```
Главный класс работующий в проекте, расширение ```Api```.

#### Конструктор: 
- передает ```Api``` поля ```baseUrl```,```options``` в родительский конструктор.
- сохраняет входящий ```url``` запроса в ```cdn```

#### Поля 
- ```cdn``` хранит в себе ```url``` запроса

#### Методы
- ```getProductList``` -- метод для получения списка товаров с сервера
- ```orderProducts``` -- метод для отправки данных заказов на сервер


### Класс ```ApiState```
Данный класс нужен для того чтобы содержать в себе данные страницы и методы.
Это состояние приложения: каталог, превью, форма заканов, корзина.
Расширяется базовый абстрактным классом ```Model<T>``` через интерфейс ```IAppState```.
```
export interface IAppState {
  loading: boolean;
  catalog: IProductItem[];
  preview: string;
  order: IOrder;
  basket: string[];
  total: string | number;
}
```

#### Поля 
- loading -- поле для загрузки
- catalog -- поле для данных списка товаров которые инициализированны с сервера
- preview -- поле для данных товаров которые мы видим на экране
- order -- поле для данных заказа, которые инициализируются на сервер
- basket --  поле для товаров которые мы добавили в корзину
- total -- сумма на которую выходят товары
  
#### Методы
- ```setCatalog``` -- установка данных в каталог
- ```setPreview``` -- установка данных на экран
- ```clearBasket``` -- очистка данных корзины
- ```addToOrder``` -- добавление товара в корзину
- ```setProductToBasket``` -- установка данных в корзину
- ```removeFromOrder``` -- удаление товара из заказа
- ```removeProductToBasket``` -- удаление товара из корзины
- ```setContactField``` -- установка поля контактов
- ```setOrderField``` -- установка поля заказа
- ```validateContact``` -- проверка валидации данных контакта
- ```validateOrder``` -- проводим валидацию данных заказа
- ```set total``` -- установка суммы товара в корзине
- ```get statusBasket``` -- получение статуса корзины
- ```get bskt``` -- получение данных товаров в корзине
- ```get Total``` --получение сумарной суммы товаров в корзине




 ### Класс ```ProductItem```
Класс в котором происходит хранение данных. 
Заголовок, описание, категория, изображение, цена.
```Model<T>``` по интерфейсу ```IProductItem```
```
export interface IProductItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}
```

## View - компонент представления

### Класс ```Card```
Данный класс нужен для вывода данных карточек товара на экране
```Component<T>``` по интерфейсу ```ICard```

```
interface ICard {
  title: string;
  category: string;
  image: string;
  price: number;
  text: string;
}
```
#### Конструктор: 
- принимает ```container```,```actions```
- передает container в контейнер родителя
- сохраняет элементы разметки
- если обьект ```actions``` был передан, то создаем слушать клика и вешаем его на ```container``` в котором вызываем событие ```actions```
```
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
```

#### Поля 
- ```title``` -- хранение разметки заголовка карточки
- ```category``` -- хранение разметки категории карточки
- ```image``` -- хранение разметки изображения карточки
- ```categoryColor``` -- модификатор словоря для изменения содержимого

  
#### Методы
- ```set title``` -- установка содержимого заголовка
- ```set category``` -- установка содержимого категории
- ```set image``` -- установка содержимого изображения
- ```set price``` -- установка содержимого цены
  



### Класс ```CardPreview```

Данный класс нужен для отображения карточек на экране (превью)
Расширение класса Card<T> по интерфейсу ICardPreview

```
interface ICardPreview {
  text: string;
}
```

#### Конструктор
- принимает ```container``` с типом ```HTMLElement``` и ```actions``` c типом ```ICardActions```
```
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
```
- передает ```container``` и ```actions``` в родительский конструктор, затем сохраняет необходимые элементы разметок в полях
- если с ```actions``` все хорошо и был передан, то вешаем прослушку события клика на ```button``` и вызываем в нем ```actions```. Сам ```container``` удаляется

#### Поля 
- ```text``` - хранит разметку в описании (превью)
- ```button``` - хранит разметку кнопки (превью)

#### Методы
- ```set text``` - установка содержимого описания (превью)




### Класс ```CardBasket```
Данный класс нужен для отображения карточек товаров в каталоге.
Расширение базовым абстрактным классом ```Component<T>``` по интерфейсу ```ICardBasket```
```
interface ICardBasket {
  title: string;
  price: number;
  index: number;
}
```

#### Конструктор
- принимает ```container``` с типом ```HTMLElement``` и обьект события ```actions``` с типом  ```ICardActions```
```
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
```
- передает ```container``` в родительский контейнер, сохраняет разметку в полях
- если ```actions``` был передан, то вешаем прослушку события клика на ```button``` c вызовом обьекта ```actions```. Сам ```container``` удаляется


#### Поля 
- ```title``` --хранит разметку заголовка
- ```price``` --хранит разметку цены
- ```button``` --хранит разметку кнопки удаления
- ```index``` --хранит разметку порядкого номера


#### Методы
- ```set title``` --установка заголовка
- ```set price``` --установка порядкого номера
- ```set index``` --установка цены
