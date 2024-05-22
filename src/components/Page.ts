import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

// этот интерфейс нужен для отображения данных
interface IPage {
  catalog: HTMLElement[]
}
// Расширяется базовым абстрактным классом Component<T> по интерфейсу IPage, данный класс нужен для отображения элементов на страние (Корзина, каталог, счетчик заказов в корзине). Так же эспортируем
export class Page extends Component<IPage> {
  protected _catalog: HTMLElement;
  protected _counter: HTMLElement;
  protected _basket: HTMLElement;
  protected _wrapper: HTMLElement;

  constructor(container: HTMLElement, protected evt: IEvents) {
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery'); // разметка каталога товаров 
    this._counter = ensureElement<HTMLElement>('.header__basket-counter'); // контейнер в котором будет информация о счете товаров в корзине
    this._basket = ensureElement<HTMLElement>('.header__basket'); // хранит разметку кнопки корзины
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper'); // обертка, разметка страницы которую будет хранить
    // открытие корзины
    this._basket.addEventListener('click', () => {
      this.evt.emit('basket:open');
    });
  }
  // установка значения в счетчике товаров корзины
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }
  // установка каталога
  set catalog(items: HTMLElement[]) {
      this._catalog.replaceChildren(...items);
  }
  // установка класса для прокрутки страницы (блокировка), навешиваем несколько классов с помощью которых блокируется прокрутка - 'page__wrapper_locked'
  set locked(value: boolean) {
    if (value) {
        this._wrapper.classList.add('page__wrapper_locked');
    } else {
        this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}