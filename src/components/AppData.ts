// состояние приложения, описание продуктов, заказ, заказ формы данные, ошибка формы
import { IAppState, IProductItem, IOrder, IOrderForm, FormErrors } from "../types"; 
// класс дженерик конструктор, метод привязки события
import { Model } from "./base/Model"; 
// на основе дженерика конструктора создаем AppData, для записи информации о товаре, о заказе и информации пользователя
export class AppData extends Model<IAppState> {
  preview: string;  
  catalog: Product[];
  order: IOrder = {
    address: '',
    email: '',
    phone: '',
    payment: 'card',
    items: [],
    total: 0
  };
  basket: Product[] = [];
  formErrors: FormErrors = {};
  //очистка корзины 
  clearBasket() {
    this.basket = []
    this.order.items = []
  }










  getCountProductInBasket() {
    return this.basket.length;
}

addToBasket(product: Product) {
    this.basket.push(product);
}


removeFromBasket(product: Product) {
    this.basket = this.basket.filter((item) => item.id !== product.id);
}


getTotalBasketPrice() {
    let total = 0;
    this.basket.forEach((item) => {
        total = total + item.price;
    });

    return total;
}



  //добавления товара в корзину и присоение ему id
  addToOrder(item: Product) {
    this.order.items.push(item.id)
  }
  // удаление из заказа товара с проработанной логикой в if для того чтобы удалялся определенный товар
  removeFromOrder(item: Product) {
    const index = this.order.items.indexOf(item.id);
    if (index >= 0) {
      this.order.items.splice( index, 1 );
    }
  }
  // установка данных в каталог
  setCatalog(items: IProductItem[]) {
    this.catalog = items.map(item => new Product(item, this.events));
    this.emitChanges('items:changed', { catalog: this.catalog });
  }
  // установка данных на экран
  setPreview(item: Product) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }
  // установка товаров в корзину
  setProductToBasket(item: Product) {
    this.basket.push(item)
  }
  // удаление товаров из корзину
  removeProductToBasket(item: Product) {
    const index = this.basket.indexOf(item);
    if (index >= 0) {
      this.basket.splice( index, 1 );
    }
  }
  // получение статуса корзины
  get statusBasket(): boolean {
    return this.basket.length === 0
  }
  // сделано с таким названием для получение ланных товара корзины
  get bskt(): Product[] {
    return this.basket
  }
  // установка суммы товара в корзине
  set total(value: number) {
    this.order.total = value;
  }
  // получение сумарной суммы товаров в корзине
  getTotal() {
    return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
  }
  // установка поля заказа
  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if (this.validateOrder()) {
        this.events.emit('order:ready', this.order);
    } 
  }
  // установка поля контактов
  setContactField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if (this.validateContact()) {
        this.events.emit('order:ready', this.order);
    } 
  }
  // проводим валидацию данных заказа
  validateOrder() {
      const errors: typeof this.formErrors = {};
      // нету адреса, выводим текстовую ошибку
      if (!this.order.address) {
        errors.address = 'Необходимо указать адресс';
      }
      this.formErrors = errors;
      this.events.emit('formErrors:change', this.formErrors);
      return Object.keys(errors).length === 0;
  }
  // проводим валидацию контактов пользователя 
  validateContact() {
      const errors: typeof this.formErrors = {};
      // если нету email то выводим ошибку
      if (!this.order.email) {
          errors.email = 'Необходимо указать email';
      }
      // если нету phone выводим ошибку
      if (!this.order.phone) {
          errors.phone = 'Необходимо указать телефон';
      }
      
      this.formErrors = errors;
      this.events.emit('formErrors:change', this.formErrors);
      return Object.keys(errors).length === 0;
  }

}

// на основе класса дженерика с хранением данных о товаре, создаем класс Product и экспортируем
export class Product extends Model<IProductItem> {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
  selected: boolean; // это нужно для того чтобы не могли добавить по новому продукт в корзину
}



