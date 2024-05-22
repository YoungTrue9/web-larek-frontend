import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

// интерфейс в котором хранится скелет для информации товара, с описанным для него типоми данных
interface ICard {
    title: string;
    category: string;
    image: string;
    price: number;
    text: string;
}

// опциональный обьект c типом ICardActions (событие actions)
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
// на основе существуещего класса дженерик Card создаем класс дженерик Сomponent и экспортируем 
export class Card<T> extends Component<ICard> {
  protected _title: HTMLElement; // название
  protected _image: HTMLImageElement; // картинка
  protected _category: HTMLElement; // категория
  protected _price: HTMLElement; // цена
  protected _categoryColor = <Record<string, string>> { // опсания категории
    "софт-скил": "soft",
    "другое": "other",
    "дополнительное": "additional",
    "кнопка": "button",
    "хард-скил": "hard"
  }

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._title = ensureElement<HTMLElement>(`.card__title`, container); // для передачи в html названия
    this._image = ensureElement<HTMLImageElement>(`.card__image`, container); // для передачи в html картинки
    this._category = ensureElement<HTMLElement>(`.card__category`, container); // для передачи в html категории
    this._price = ensureElement<HTMLElement>(`.card__price`, container); // для передачи в html цены


    if (actions?.onClick) {
        container.addEventListener('click', actions.onClick);
    }
  }
  // метод установки содержимого заголовка
  set title(value: string) {
    this.setText(this._title, value);
  }
  // метод установки содержимой категории
  set category(value: string) {
    this.setText(this._category, value);
    this._category.className = `card__category card__category_${this._categoryColor[value]}`
  }
  // метод установки содержимой картинки
  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }
  // метод установки содержимой цены с ветвлением по цене
  set price(value: string) {
    // если цены нету то выводим 'Бесценно'
    if(value === null) {
      this.setText(this._price, `Бесценно`);
    } 
    // или выводим через value сумму 
    else {
      this.setText(this._price, `${value} синапсов`);
    }
  }
}
// интерфейс ICardPreview
interface ICardPreview {
  text: string;
}
// Расширение класса Card<T> по интерфейсу ICardPreview, данный класс нам нужен будет для отображения карточек на экране монитора, так же экспоритруем

export class CardPreview extends Card<ICardPreview> {
  protected _text: HTMLElement;
  protected _button: HTMLElement;
  
  constructor(container: HTMLElement, act?: ICardActions) {
    super(container, act)
    this._button = container.querySelector(`.card__button`);
    this._text = ensureElement<HTMLElement>(`.card__text`, container);

    if (act?.onClick) {
      if (this._button) {
          container.removeEventListener('click', act.onClick);
          this._button.addEventListener('click', act.onClick);
      } 
    }
  }
  // установка содержимого описания (превью)
  set text(value: string) {
    this.setText(this._text, value);
  }
}
// интерфейс ICardBasket нужен будет для отображения карточек товаров
interface ICardBasket {
  title: string;
  price: number;
  index: number;
}
// Расширяем базовым абстрактным классом Component<T> по интерфейсу ICardBaskets для отображения карточек товаров в каталоге, так же эскпортируем
export class CardBasket extends Component<ICardBasket> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLElement;
  protected _index: HTMLElement;
  
  constructor(container: HTMLElement, act?: ICardActions) {
    super(container);
    this._title = ensureElement<HTMLElement>(`.card__title`, container); // для вывода названия товара
    this._price = ensureElement<HTMLElement>(`.card__price`, container); // для вывода цены товара
    this._index = ensureElement<HTMLElement>(`.basket__item-index`, container); // для вывода индекса товара
    this._button = container.querySelector(`.card__button`); // для вывода кнопки

    if (act?.onClick) {
      if (this._button) {
          container.removeEventListener('click', act.onClick);
          this._button.addEventListener('click', act.onClick);
      } 
    }
  }
  // установка индекс товара в корзине
  set index(value: number) {
    this.setText(this._index, value);
  }
  // установка заголовка товара
  set title(value: string) {
    this.setText(this._title, value);
  }
  // установка цены товара, если цены нету то ставим по умолчанию 'Бесценно'
  set price(value: string) {
    // если цены нету то выводим 'Бесценно'
    if(value === null) {
      this.setText(this._price, `Бесценно`);
    } 
    // или выводим через value сумму 
    else {
      this.setText(this._price, `${value} синапсов`);
    }
  }
}

  