export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {}
  // переключает класс для указанного элемента и при наличии параметра ```force``` принудительно добавляет или удаляет класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
      element.classList.toggle(className, force);
    }
  // изменяет состояние блокировки элемента в зависимости от значения ```state```
    setDisabled(element: HTMLElement, state: boolean) {
      if (element) {
        if (state) element.setAttribute('disabled', 'disabled');
        else element.removeAttribute('disabled');
      }
    }
  // метод для инициализации текста элементов, принимает значение любого типа и преобразует его в строку.

    protected setText(element: HTMLElement, value: unknown) {
      if (element) {
        element.textContent = String(value);
      }
    }
  // метод для инициализации изображения и добавления к нему текста
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
      if(element) {
        element.src = src;
        if(alt) {
          element.alt = alt;
        }
      }
    }
  // метод предоставляет корневой DOM элемент компонента и позволяет обновить его состояние с помощью переданных данных. По итогу возвращает контейнер компонента
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
  }
