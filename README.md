# Проектная работа "Веб-ларек"


## 🚀 Описание

Веб-ларек - удобный мини-интернет магазин в котором можно просмотреть каталог товаров. Можно совершать заказы и управлять своими покупками. Проект построен на базе передовых технологий. TypeScript, HTML,SCSS. Использовался Webpack , чтобы обеспечить вам отличный пользовательский опыт.


## ⚒️Подход разработки
В проекте используются (ООП)-'событийно-ориентированный подход'. 
Здесь предпологается что взаимодействие между различными компонентами приложения будет осуществлятся через обмен сообщениями между вызванными событиями.<br>
В проекте используется модель MVP (Model-View-Presenter).<br> С помощью этой модели приложение разбивает свою структуру на три главных основных компонентов: модель, представление, презентатор.<br>
  1.Модель отвечает за работу с данными и бизнес логикой. (Представля собой интерфейс пользователя)<br>
  2.Презентатор свзявает модель и представление. Обрабатывает событие и передает данные между ними. 

```
📁 src/  — исходные файлы проекта
├── 📁 components/  — папка с JS компонентами
│   ├── 📁 base/  — папка с базовым кодом
│   └── ... 
├── 📄 pages/index.html — HTML-файл главной страницы
├── 📄 types/index.ts — файл с типами
├── 📄 index.ts — точка входа приложения
├── 📄 scss/styles.scss — корневой файл стилей
├── 📄 utils/constants.ts — файл с константами
└── 📄 utils/utils.ts — файл с утилитами
```


## 💻Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

После клонирования проекта установить зависимости:

```
npm install
```
Для запуска проекта в режиме разработки выполнить команду:
```
npm run start
```
и открыть в браузере страницу по адресу http://localhost:1234

или же можно выполнить через другую команду, на ваше усмотрение

```
yarn
yarn start
```
## 📦Сборка
Для сборки проекта в продакшен выполнить команду:
```
npm run build
```

или же можно выполнить через другую команду, на ваше усмотрение

```
yarn build
```
Для данного проекта нет ограничений по использованию пакетного менеджера, поэтому можно
использовать также YARN или PNPM.

## 📰Cхема проекта
При переходе по ссылки : https://drive.google.com/file/d/1iTYSfZzsEdM217wgPc_qx8JMDnFhwxUD/view
Нужно нажать на кнопку 'Открыть в приложение "draw.io"'. После этого откроется сайт с UML схемой проекта.



# Базовый код

### Класс ```Model<T>```
Абстрактный класс дженерик, конструктор, метод привязки события.<br>
(Обобщающий в себе конструктор и метод привязки событий)

#### Конструктор:
- принимает на вход объект данных неявного типа и объект события типа ```IEvent```
- производит соеденение входящих обьектов ```data```.

#### методы:
- ```emmitChanges``` - регестрирует входящее событие в ```EventEmitter```



### Класс ```Component<T>```
Абстрактный класс дженерик, работает с конструктор и с компонентами отображения для сайта.
(обобщающий в себе конструктор и основные методы работы с компонентами)

#### Особенности:
- Это обобщенный тип ```<T>``` с помощью этого можно определить тип данных, для создания компонента.
- Класс является абстрактным и предназначен для наследования и работы с ним.

#### Конструктор:
- принимает на вхождение ```container``` с типом ```HTMLElement```
```(constructor(container: HTMLElement)``` - Принимает DOM-элемент, который служит контейнером для компонента.

#### Методы:
- ```toggleClass(element: HTMLElement, className: string, force?: boolean)``` -- переключает класс для указанного элемента и при наличии параметра ```force``` принудительно добавляет или удаляет класс
- ```setDisabled(element: HTMLElement, state: boolean)``` -- изменяет состояние блокировки элемента в зависимости от значения ```state```
- ```render(data?: Partial<T>): HTMLElement``` -- метод предоставляет корневой DOM элемент компонента и позволяет обновить его состояние с помощью переданных данных. По итогу возвращает контейнер компонента
- ```setImage(element: HTMLImageElement, src: string, alt?: string)``` -- метод для инициализации изображения и добавления к нему текста
- ```setText(element: HTMLElement, value: unknown)``` -- метод для инициализации текста элементов, принимает значение любого типа и преобразует его в строку.



### Класс ```EventEmitter```
Класс ```EventEmitter``` обеспечивает работу событий исправно. Функциональность класса стандартная: возможность установить или же снять слушатели событий, так же вызывать слушатель при возникновении события.<br>
(как пример, написал несколько простых обьяснений что происходит. Все остальные методы работают по тому же принципу)

## Особенности: 
- Может поддерживать событие (подписываться на них) и так же делать отписку от них и работу с их данными, так же может слушать событие по шаблону.

## Методы:

- ```on<T extends object>(eventName: EventName, callback: (event: T) => void)```: Подписывает на событие с заданным именем.

- - ```eventName ```: Имя события для подписки.<br>
- - ```callback ```: Функция обратного вызова для события.<br>
- ```off(eventName: EventName, callback: Subscriber) ```: Отписывает от события.

- - ```eventName```: Имя события для отписки.<br>
- - ```callback```: Функция обратного вызова для удаления.<br>
- ```emit<T extends object>(eventName: string, data?: T)```: Инициирует событие с данными.

- - ```eventName```: Имя инициируемого события.<br>
- - ```data```: Данные для обработчиков события.<br>
- ```onAll(callback: (event: EmitterEvent) => void)```: Подписывается на все события.

- - ```callback ```: Функция обратного вызова для всех событий.<br>
- - ```offAll() ```: Снимает все обработчики событий.<br>
- ```trigger<T extends object>(eventName: string, context?: Partial<T>)```: Создает триггер для события.

- - ```eventName```: Имя события для триггера.
- - ```context```: Контекст для события при инициации.


### Класс ```Api```
Класс ```Api``` предназначен для выполнения HTTP-запросов к API. 
Хранит главные основные методы и поля необоходимые для работы с сервером.<br>
Получает и хранит базовый/стандартный url: ```baseUrl``` и опции запроса: ```options```<br>
Методы позволяют производит обработку запроса и получение данных.

#### Свойства:
```baseUrl``` -- ссылка (url), хранит базовый URL адрес API <br>
```options``` -- хранит настройки запроса с доп.заголовакми<br>


#### Конструктор :
конструктор класса принимает два параметра<br>
```baseUrl``` (```string```): Базовый URL адрес API.<br>
```options``` (```RequestInit```): Необязательный параметр, но представляющий начальные настройки запроса. По умолчанию олн будет пустм объектом.

#### Методы:
- ```get(url: string): Promise<object>``` - Выполняет GET-запрос по указанному URI относительно ```baseUrl```. Делает возврат ```Promise``` с результатом ответа.
- ```post(url: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>``` - Выполняет запрос к серверу методом POST, PUT, DELETE все зависит от параметров ```method```. ```url (string)```: URI  это ресурс для запроса, а ```data (object)``` это объект в котором данные для отправки в теле запроса.
- ```handleResponse(response: Response): Promise<object>``` -  Это обработочик ответа от сервера, он возвращает Promise. С помощью этого промиса разрешен результат в формате JSON в случае успешного ответа от сервера. Если ошибка, то вывод самой ошибки или статус ошибки.


# Model - Компоненты модели данных 






### Класс ```LarekApi```
Основной главный класс работующий в проекте с сетью, расширение базового класса ```Api```.

#### Конструктор: 
- принимает и передает в родительский конструктор ```Api``` поля ```baseUrl```,```options```
- принимает и сохраняет входящий ```url``` запроса в ```cdn```

#### Поля 
- ```cdn``` хранит в себе ```url``` запрос

#### Методы
- ```getProductList``` -- метод для получения списка товаров с сервера
- ```orderProducts``` -- метод для отправки данных заказов на сервер


### Класс ```ApiState```
Данный класс нужен для того чтобы содержать в себе данные страницы и методы.<br>(Является моделью данных приложения)<br>
Это состояние приложения: каталог, превью, форма заканов, корзина.<br>
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




 ### Класс ```ProductsItem```
Класс в котором происходит хранение данных. <br>
(Модель хранения данных товара)<br>
Заголовок, описание, категория, изображение, цена. - то что хранится внутри<br>
```Model<T>``` по интерфейсу ```IProductItem```
```
export interface IProductsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}
```

# View - компоненты представления

### Класс ```Card```
Данный класс нужен для вывода данных карточек товара на экране в каталоге<br>
Поля сразу отвечают за связь с разметкой и методы за наполнение разметки данными<br>
С помощью этого класса предоставляется удобный интерфейс для создания и управления карточками товаров.<br>
Так же позволяет легко настраивать их внешний вид и поведение в зависимости от тех свойств и действий которые передавались.
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
- принимает ```container``` с типом```actions```<br>
- передает ```container``` в контейнер родителя<br>
- сохраняет элементы разметки в полях<br>
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
  
#### Типы
- ```CardCategory``` - Объект содержащий возможные категории для карточек и их стилистические модификаторы.



### Класс ```CardPreview```

Данный класс нужен для отображения карточек на экране (превью)<br>
Поля отвечают за связь с разметкой и методы за наполнение разметки данными<br>
Расширение класса ```Card<T``` по интерфейсу ```ICardPreview```<br>

```
interface ICardPreview {
  text: string;
}
```

#### Конструктор
- принимает ```container``` с типом ```HTMLElement``` и опциональный обьект события ```actions``` c типом ```ICardActions```
  
```
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
```

- передает ```container``` и ```actions``` в родительский конструктор, затем сохраняет необходимые элементы разметок в полях<br>
- если с ```actions``` все хорошо и был передан, то вешаем прослушку события клика на ```button``` и вызываем в нем ```actions```. Сам слушатель ```container``` удаляется

#### Поля 
- ```text``` - хранит разметку в описании (превью)
- ```button``` - хранит разметку кнопки (превью)

#### Методы
- ```set text``` - установка содержимого описания (превью)




### Класс ```CardBaskets```
Данный класс нужен для отображения карточек товаров в каталоге.<br>
Поля отвечают за связь с разметкой, методы за наполнение разметки данными.<br>
Расширение базовым абстрактным классом ```Component<T>``` по интерфейсу ```ICardBaskets```
```BasketItem``` обеспечивает управление каждым элементом в корзине и предоставляет методы настройки его характеристик и обратки удаления.

```
interface ICardBaskets {
  title: string;
  price: number;
  index: number;
}
```

#### Конструктор
- принимает ```container``` с типом ```HTMLElement``` и опциональный обьект события ```actions``` с типом  ```ICardActions```
  
```
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
```

- передает ```container``` в родительский контейнер, сохраняет разметку в полях<br>
- если обьект ```actions``` был передан, то вешаем прослушку события клика на ```button``` c вызовом обьекта ```actions```. Сам слушатель ```container``` удаляется


#### Поля 
- ```title``` --хранит разметку заголовка
- ```price``` --хранит разметку цены
- ```button``` --хранит разметку кнопки удаления
- ```index``` --хранит разметку порядкого номера


#### Сеттеры
- ```set title``` --установка заголовка товара
- ```set price``` --установка цены товара, если цены нету то ставим по умолчанию ```'Бесценно'```
- ```set index``` --установка индекс товара в корзине




### Класс ```Page```
Данный класс нужен для отображениях данных элементов страницы.<br>
(Каталог, корзина, счетчик товаров в корзине)<br>
Поля так же отвечают за связь с разметкой, то есть метод закрытия или открытия для прокрутки страницы при открытом или закротом модальном окне<br>
Расширяется базовым абстрактным классом ```Component<T>``` по интерфейсу ```IPage```

```
interface IPage {
  catalog: HTMLElement[]
}
```

#### Конструктор
- принимает ```container``` типа ```HTMLElement``` и обьект ```event``` с типом ```IEvent```, передает ```container``` в родительский конструктор.
- сохранение необходимых элементов в разметки поля.
- на кнопку корзины ```basket``` вешаем слушатель события ```click```. 



#### Поля 
- ```counter``` --хранит счет товаров которые находятся в корзине
- ```catalog``` --хранит разметку каталог товаров
- ```wrapper``` --хранит разметку страницы
- ```basket``` --хранит разметку кнопку корзины


#### Методы
- ```set counter``` --установка значения в счетчике товаров корзины
- ```set catalog``` --установка каталога
- ```set locked``` --установка класса для прокрутки страницы (блокировка)




### Класс ```Modal```
Данный класс нужен для отображения модального окна.<br>
Здесь нету практически полей, это контейнер в котором будут выводится окна.<br>
Здесь имеются только поля открытия или закрытия онка, ну и так же наполнение его нужным контентом<br>
Расширяется базовым абстрактным классом ```Component<T>``` по интерфейсу ```IModalData```

```
interface IModalData {
  content: HTMLElement;
}
```

#### Конструктор
- принимает ```container``` с типом ```HTMLElement``` и обьект ```event```  с типом ```IEvent```, передает ```container``` в родительский конструктор, сохраняет информацию в полях.<br>
- вешаем слушатель click на кнопку закрытия ```closeButton``` и ```container``` с методом закрытия окна ```close``` в качестве колбека<br>
- вешаем слушатель ```click``` на ```content```, для остановки события при клике на модальное окно. (закрытие окна)<br>


#### Свойства

- ```closeButton```: элемент кнопки для закрытия модального окна.
- ```content```: элемент представляющий контент модального окна.


#### Методы
- ```set content(value: HTMLElement)``` --установка нового контента в модальное окно
- ```open``` --открытие модального окна и добавляя класс ```modal_active``` к данному контейнеру 
- ```close``` --закрытие модального окна и удаление класса ```modal_active```из данного контейнера
- ```render``` --отрисовка контента для модального окна. Принимает обьект свойств ```data``` и открывает модальное окно



### Класс ```Basket```
Данный класс нужен для того чтобы корзина отображалась в модальном окне. Это является контеном для модального окна.
Расширяется базовым абстрактным классом ```Component<T>``` по интерфейсу ```IBasket```

```
interface IBasket {
  items: HTMLElement[];
  total: number;
}
```

#### Конструктор
- принимает ```container``` с типом ```HTMLElement``` и обьект ```event``` с типом ```IEvent```<br>
- передает ```container``` в родительский конструктор, сохраняет необходимые элементы разметки в полях<br>
- Если мы имеем ```button``` то вешаем на него ```click``` прослушку события, и при этом регистрацией события в качестве колбека (order:open) 


#### Поля 
- ```button``` --хранит разметку кнопки (оформления заказа)
- ```list ``` --хранит разметку списка товаров
- ```total``` --хранит разметку суммы товаров
- ```items``` --хранит список товаров в корзине


#### Сеттеры
- ```set items``` --устанавливает товары в разметку ```list```
- ```set total``` --устанавливает значение суммы товара (стоимость) в корзине, принимает ```value``` разных типов ```(string | number)```




### Класс ```Order```
Данный класс нужен для заказа в модальном окне, адаптируя его для работы с формой заказа. <br>
Этот класс обеспечивает интеграцию с системой событий для управления процессом создания заказа, от выбора типа оплаты до ввода адреса доставки.<br>
(Это первый шаг заказа)<br>
Расширяется классом ```Form<T>``` по интерфейсу ```IOrderForm```

```
export interface IOrderForm {
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
  total?: string | number;
}
```


#### Конструктор
- принимает ```container``` типа ```HTMLElement``` и объект ```event``` c типом ```IEvent```. Передает ```container```, ```event``` в родительский конструктор. Сохроняет элементы в полях<br>
- на кнопку выбора оплаты вешаем слушатель ```click``` по которому методом ```payment``` производится установка класса активности на эту самую кнопку


#### Поля 
- ```buttons ``` --хранит разметку кнопок формы оплаты


#### Методы
- ```set payment``` --устанавливает класс активности на кнопку (active)
- ```set payment``` --устанавливает значение поля адрес




### Класс ```Contacts```
Данный класс нужен для заказа товара, вывод контакта<br>
(Отвечает за отображение второго шага заказа в модальном окне.)<br>
Расширяется классом ```Form<T>``` по интерфейсу ```IOrderForm```


#### Конструктор
- принимает ```container``` типа ```HTMLElement``` и объект ```event``` c типом ```IEvent```.<br>
- Передает ```container```, ```event``` в родительский конструктор. Сохроняет элементы в полях


#### Методы
- ```set phone``` --устанавливает значение поля телефона
- ```set email``` --устанавливает значение поля почты




### Класс ```Form<T>```
Данный класс нужен для работы самой формы и валидации её.
Это класс Дженерик и принимает в переменной ```T``` - это тип данных компонента для отображения<br>
Расширяется классом ```Component<T>``` по интерфейсу ```IFormStates```

```
interface IFormStates {
  valid: boolean;
  errors: string[];
}
```


#### Конструктор
- принимает ```container``` типа ```HTMLElement``` и объект ```event``` c типом ```IEvent```.<br>
-  Передает ```container```, ```event``` в родительский конструктор. Сохроняет элементы в полях<br>
- вешает на ```container``` слушатель ```input``` при котором, его имя со значением отправляются методу класса ```onInputChange```<br>
- вешаем на ```container``` слушатель ```submit``` при котором происходит регистрация с указанием имени ```container```

#### Методы
- ```onChange(field, name)``` --регистрирует событие с именем конкретного поля
- ```render(state)``` --отрисовка формы и ее элементов

#### Сеттеры
- ```set valid(value: boolean)``` - управляет доступностью кнопки отправки формы в зависимости от валидности данных самой формы.
- ```set errors(value: string[])``` - устанавливает текст ошибок валидации формы, соединяя все сообщения ошибок в одну строку.


### Класс ```Success```
Данный класс нужен для вывода сообщения об успешном оформление заказа в модальном окне. (контент для модального окна)

Расширяется базовый абстрактный классом ```Component<T>``` по интерфейсу ```ISuccess```

```
interface ISuccess {
  total: number;
}
```


#### Конструктор
- принимает ```container``` типа ```HTMLElement``` и опциональный объект события ```actions``` c типом ```ISuccessActions```. 

```
interface ISuccessActions {
  onClick: () => void;
}
```

- передает ```container``` в родительский конструктор, сохраняет необходимые элементы разметки в полях
- если все хорошо и обьект ```actions``` был передан, то вешаем слушатель клика на ```close``` с вызовом события ```actions```


#### Поля 
- ```total``` --разметка общей суммы товаров в заказе
- ```close``` --разметка кнопки закрытия окна


#### Методы
- ```set total``` --установка значения общей суммы
