import { Form } from './common/Form';
import { IOrderForm } from '../types';
import { IEvents } from './base/Events';
import { ensureAllElements } from '../utils/utils';

// Расширяется классом Form<T> по интерфейсу IOrderForm, данный класс нужен для заказа в модальном окне, делаем адаптацию для работы с формой заказа
export class Order extends Form<IOrderForm> {
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);
		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name;
				events.emit('payment:change', button); // выбор оплаты
			});
		});
	}
	// устанавливает класс активности на кнопку (active)
	set payment(name: string) {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}
	// устанавливает значение поля адрес
	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
// Расширяется классом Form<T> по интерфейсу IOrderForm, данный класс отвечает за отображение второго шага заказа в модальном окне.

export class Сontacts extends Form<IOrderForm> {
	constructor(container: HTMLFormElement, evt: IEvents) {
		super(container, evt);
	}
	// устанавливает значение поля телефона (строка под номер телефона пользователя)
	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
	// устанавливает значение поля почты (строка под электронный адрес почты пользователя)
	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
