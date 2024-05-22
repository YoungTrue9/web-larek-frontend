import './scss/styles.scss';
// components/common
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/common/Success';
// components/base
import { EventEmitter } from './components/base/events';
// components
import { Apilarek } from './components/Apilarek';
import { AppData, Product } from './components/AppData';
import { Card, CardBasket, CardPreview } from './components/Card';
import { Page } from './components/Page';
import { Order, Сontacts } from './components/Order';
// types
import { IOrderForm } from './types';
// utils
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// нужные передачи из ВНЕ
const Evtemitter = new EventEmitter();
const Api = new Apilarek(CDN_URL, API_URL);

Evtemitter.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

// Модель состояния приложения
const appData = new AppData({}, Evtemitter);

// Глобальные контейнеры с информацией
const page = new Page(document.body, Evtemitter); // основная страница на которую будет выводится сам сайт
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), Evtemitter) // модальные окна 

// Шаблоны для нашего сайта 
const successTpl = ensureElement<HTMLTemplateElement>('#success'); // сообщение об успешном заказе
const cardPreviewTpl = ensureElement<HTMLTemplateElement>('#card-preview'); // отображение карточек на экране
const cardCatalogTpl = ensureElement<HTMLTemplateElement>('#card-catalog'); // каталог карточек
const cardBasketTpl = ensureElement<HTMLTemplateElement>('#card-basket'); // корзина открытая в которой лежат товары
// ------------------------вот это мы будем переиспользовать постоянно для нашего интерфейса------------------------
const orderTpl = ensureElement<HTMLTemplateElement>('#order'); // модальное окно для заказа
const basketTpl = ensureElement<HTMLTemplateElement>('#basket'); // корзина для модальное окно
const contactsTpl = ensureElement<HTMLTemplateElement>('#contacts'); // контакты человека для модального кона

// Это части интерфейсов которые мы будем использовать постоянно и изменять их
const basket = new Basket(cloneTemplate<HTMLTemplateElement>(basketTpl), Evtemitter); // корзина для товаров
const order = new Order(cloneTemplate<HTMLFormElement>(orderTpl), Evtemitter); // заказ покупателя
const contacts = new Сontacts(cloneTemplate<HTMLFormElement>(contactsTpl), Evtemitter); // данные о покупателе

// Бизнес-логика нашего проекта

// Самое главное получение карточки и передача ее в модель. Все происходит через метод 'on'
// событие "items:changed"
Evtemitter.on('items:changed', () => {
    // передача ключ и значение
  page.catalog = appData.catalog.map((item) => {
    const card = new Card(cloneTemplate(cardCatalogTpl), {
        // coбытие "card:select"
      onClick: () => Evtemitter.emit('card:select', item) 
    });
    // возврат карточки и рендер ее
    return card.render({
      title: item.title,
      category: item.category,
      image: Api.cdn + item.image,
      price: item.price
    });
  })
})

// Если пользователь нажал на карточку для просмотра, то открываем ее
// событие "card:select"
Evtemitter.on('card:select', (item: Product) => {
    // попытка получить данные
  appData.setPreview(item); 
});

// Данные для превью получены продолжаем работу для открытие окна
// событие "preview:changed"
Evtemitter.on('preview:changed', (item: Product) => {
    //делаем клонирование карточки и дублируем через рендер туда информацию
  const card = new CardPreview(cloneTemplate(cardPreviewTpl), {
    // событие "card:add"
    onClick: () => Evtemitter.emit('card:add', item)
  });
    // в модальное окно рендарим (дублируем) данные карточек 
  modal.render({
    content: card.render({
      title: item.title, // название
      text: item.description, // описание
      category: item.category, // категория
      image: Api.cdn + item.image, // картинка
      price: item.price // цена
    })
  });
});

// Пользователь добавил товар в корзину: 
// - сохранить эти данные в заказ и корзине
// - инкрементировать счетчик
Evtemitter.on('card:add', (item: Product) => {
  appData.addToOrder(item);
  appData.setProductToBasket(item);
  page.counter = appData.bskt.length;
  modal.close();
})

// Открытие корзины
Evtemitter.on('basket:open', () => {
  basket.setDisabled(basket.button, appData.statusBasket);
  basket.total = appData.getTotal();
  let i = 1;
  basket.items = appData.bskt.map((item) => {
    const card = new CardBasket(cloneTemplate(cardBasketTpl), {
      onClick: () => Evtemitter.emit('card:remove', item)
    });
    return card.render({
      title: item.title,
      price: item.price,
      index: i++
    });
  })
  modal.render({
    content: basket.render()
  })
})

// Удаление товара из корзины
Evtemitter.on('card:remove', (item: Product) => {
  appData.removeProductToBasket(item);
  appData.removeFromOrder(item);
  page.counter = appData.bskt.length;
  basket.setDisabled(basket.button, appData.statusBasket);
  basket.total = appData.getTotal();
  let a = 1;
  basket.items = appData.bskt.map((item) => {
    const card = new CardBasket(cloneTemplate(cardBasketTpl), {
      onClick: () => Evtemitter.emit('card:remove', item)
    });
    return card.render({
      title: item.title,
      price: item.price,
      index: a++
    });
  })
  modal.render({
    content: basket.render()
  })
})

// Изменение валидации формы
Evtemitter.on('formErrors:change', (errors: Partial<IOrderForm>) => {
  const { email, phone, address, payment } = errors;
  order.valid = !address && !payment;
  contacts.valid = !email && !phone;
  order.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
  contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

// Изменение полей контактов + сохранение
Evtemitter.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
  appData.setContactsField(data.field, data.value);
});

// Изменение полей заказа + сохранение
Evtemitter.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
  appData.setOrderField(data.field, data.value);
});

// Изменение полей оплаты + сохранение
Evtemitter.on('payment:change', (item: HTMLButtonElement) => {
  appData.order.payment = item.name;
})

// Открытие модального окна и добавление в него рендера с информацией
Evtemitter.on('order:open', () => {
  modal.render({
    content: order.render({
      address: '',
      payment: 'card',
      valid: false,
      errors: []
    })
  });
});

// Отправление формы заказа, то есть информация для заполнения 
Evtemitter.on('order:submit', () => {
  appData.order.total = appData.getTotal()
  modal.render({
    content: contacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    })
  });
})

// Открытие окна контактов при форме заказа
Evtemitter.on('contacts:submit', () => {
    Api.orderProducts(appData.order)
    .then((result) => {
      console.log(appData.order)
      const success = new Success(cloneTemplate(successTpl), {
        onClick: () => {
          modal.close();
          appData.clearBasket();
          page.counter = appData.bskt.length;
        }
      });
    
      modal.render({
        content: success.render({
          total: appData.getTotal()
        })
      })
    })
    .catch(err => {
      console.error(err);
    })
});

// Блокируем прокрутку страницы если открыта модалка
Evtemitter.on('modal:open', () => {
    page.locked = true;
});

// Разблокируем прокрутку страницы если открыта модалка
Evtemitter.on('modal:close', () => {
    page.locked = false;
});

// Получаем товар с сервера
Api.getProductList()
  .then(appData.setCatalog.bind(appData))
  .catch(error => {
    console.log(error);
});
