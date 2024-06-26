import './scss/styles.scss';
// components/common
import { Basket } from './components/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/Success';
// components/base
import { EventEmitter } from './components/base/Events';
// components
import { ApiLarek } from './components/ApiLarek';
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
const api = new ApiLarek(CDN_URL, API_URL);
const evtemitter = new EventEmitter();

evtemitter.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Модель состояния приложения
const appData = new AppData({}, evtemitter);

// Глобальные контейнеры с информацией
const page = new Page(document.body, evtemitter); // основная страница на которую будет выводится сам сайт
const modal = new Modal(
	ensureElement<HTMLElement>('#modal-container'),
	evtemitter
); // модальные окна

// Шаблоны для нашего сайта
const successTemplate = ensureElement<HTMLTemplateElement>('#success'); // сообщение об успешном заказе
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview'); // отображение карточек на экране
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); // каталог карточек
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket'); // корзина открытая в которой лежат товары
// ------------------------вот это мы будем переиспользовать постоянно для нашего интерфейса------------------------
const orderTemplate = ensureElement<HTMLTemplateElement>('#order'); // модальное окно для заказа
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket'); // корзина для модальное окно
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts'); // контакты человека для модального кона

// Это части интерфейсов которые мы будем использовать постоянно и изменять их
const basket = new Basket(
	cloneTemplate<HTMLTemplateElement>(basketTemplate),
	evtemitter
); // корзина для товаров
const order = new Order(
	cloneTemplate<HTMLFormElement>(orderTemplate),
	evtemitter
); // заказ покупателя
const contacts = new Сontacts(
	cloneTemplate<HTMLFormElement>(contactsTemplate),
	evtemitter
); // данные о покупателе

// Бизнес логика нашего проекта на событиях

// Самое главное получение карточки и передача ее в модель. Все происходит через метод 'on'
// событие "items:changed"
evtemitter.on('items:changed', () => {
	// передача ключ и значение
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			// coбытие "card:select"
			onClick: () => evtemitter.emit('card:select', item),
		});
		// возврат карточки и рендер ее
		return card.render({
			title: item.title,
			category: item.category,
			image: api.cdn + item.image,
			price: item.price,
		});
	});
});

// Если пользователь нажал на карточку для просмотра, то открываем ее
// событие "card:select"
evtemitter.on('card:select', (item: Product) => {
	// попытка получить данные
	// appData.setPreview(item);
    page.locked = true;
	const productItemPreview = new CardPreview(
		cloneTemplate(cardPreviewTemplate),
		{
			onClick: () => {
				if (item.selected) {
					evtemitter.emit('basket:removeFromBasket', item);
					modal.close();
				} else {
					evtemitter.emit('card:addToBasket', item);
					modal.close();
				}
				productItemPreview.updatePrice(item.selected);
			},
		}
	);

	productItemPreview.updatePrice(item.selected);

	modal.render({
		content: productItemPreview.render({
			id: item.id,
			title: item.title,
			image: api.cdn + item.image,
			category: item.category,
			description: item.description,
			price: item.price,
			selected: item.selected,
		}),
	});
});


// evtemitter.on('card:addToBasket', (item: Product) => {
// 	appData.addToBasket(item);
// 	item.selected = true;
// 	page.counter = appData.getCountProductInBasket();
//     page.counter = appData.bskt.length;
// });


// Пользователь добавил товар в корзину, сохраняем данные и делаем счетчик.
// событие "card:add"
evtemitter.on('card:addToBasket', (item: Product) => {
	appData.addToOrder(item);// считает синапсы, это прям очень нам надо
    item.selected = true
	appData.setProductToBasket(item);
	page.counter = appData.bskt.length;
	modal.close();
});


// Удаление товара из корзины, удаление данных и снижение числа в счетчике
// событие "card:remove"
evtemitter.on('basket:removeFromBasket', (item: Product) => {
	appData.removeProductToBasket(item);
    item.selected = false;
	appData.removeFromOrder(item);
	page.counter = appData.bskt.length;
	basket.setDisabled(basket.button, appData.statusBasket);
	basket.total = appData.getTotal();
	let a = 1;
	basket.items = appData.bskt.map((item) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			// событие "card:remove"
			onClick: () => evtemitter.emit('basket:removeFromBasket', item),
		});
		return card.render({
			title: item.title, // возвращение названия
			price: item.price, // возвращение цены
			index: a++, // возвращение индекса
		});
	});
	modal.render({
		content: basket.render(),
	});
});


// Данные для превью получены продолжаем работу для открытие окна
// событие "preview:changed"
evtemitter.on('preview:changed', (item: Product) => {
	//делаем клонирование карточки и дублируем через рендер туда информацию
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		// событие "card:add"
		onClick: () => evtemitter.emit('card:add', item),
	});
	// в модальное окно рендарим (дублируем) данные карточек
	modal.render({
		content: card.render({
			title: item.title, // название
			text: item.description, // описание
			category: item.category, // категория
			image: api.cdn + item.image, // картинка
			price: item.price, // цена
		}),
	});
});



// Открытие корзины
// событие "basket:open"
evtemitter.on('basket:open', () => {
	basket.setDisabled(basket.button, appData.statusBasket);
	basket.total = appData.getTotal();
	let a = 1;
	basket.items = appData.bskt.map((item) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			// событие "card:remove"
			onClick: () => evtemitter.emit('basket:removeFromBasket', item),
		});
		return card.render({
			title: item.title, // возвращение названия
			price: item.price, // возвращение цены
			index: a++, // возвращение индекса
		});
	});
	modal.render({
		content: basket.render(),
	});
});

// Изменение полей контактов + сохранение
evtemitter.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setContactField(data.field, data.value);
	}
);

// Изменение полей заказа + сохранение
evtemitter.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Изменение полей оплаты + сохранение
// событие "payment:change"
evtemitter.on('payment:change', (item: HTMLButtonElement) => {
	appData.order.payment = item.name;
});

// Изменение валидации формы
// событие "formErrors:change"
evtemitter.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { phone, email, payment, address } = errors;
	contacts.valid = !email && !phone;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment })
		.filter((element) => !!element)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((element) => !!element)
		.join('; ');
});

// Открытие модального окна и добавление в него рендера с информацией
// событие "order:open"
evtemitter.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			payment: 'card',
			valid: false,
			errors: [],
		}),
	});
});

// Отправление формы заказа, то есть информация для заполнения
// событие "order:submit"
evtemitter.on('order:submit', () => {
	appData.order.total = appData.getTotal();
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Блокируем прокрутку страницы если открыта модалка
// событие "modal:open"
evtemitter.on('modal:open', () => {
	page.locked = true;
});

// Разблокируем прокрутку страницы если открыта модалка
// событие "modal:close"
evtemitter.on('modal:close', () => {
	page.locked = false;
});

// Открытие окна контактов при форме заказа
// событие "contacts:submit"
evtemitter.on('contacts:submit', () => {
	api.orderProducts(appData.order)
		.then(() => {
			console.log(appData.order); // выводим данные о заказе, можно отключить данный console.log
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close(); // после заказа закрытие модалки (1)
					appData.clearBasket(); // после заказа закрытие модалки, закрытие корзины (2)
					page.counter = appData.bskt.length;
				},
			});

			modal.render({
				content: success.render({
					total: appData.getTotal(),
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Получаем товар с сервера
api.getProductList() // откласса Apilarek
	.then(appData.setCatalog.bind(appData))
	.catch((error) => {
		console.log(error);
	});
