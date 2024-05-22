// интерфейс который в себе хранит: описание, заголовок, категорию, изображение и цену. Нужен для хранения данных товара
    export interface IProductItem {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
    }

// обертка нужная для собрания продуктов IProductItem. 
    export interface IProductsList {
    products: IProductItem[];
    }
  
 
// интерфейс который нужен для отображения первого шага заказа в модальном окне
    export interface IOrderForm {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
    total?: string | number;
    }
// на основе существущего интерфейса создаем другой, обертку в которой все это будет хранится.
    export interface IOrder extends IOrderForm {
    items: string[];
    }
  
// интерфейс который нужен для того чтобы содержать в себе данные страницы и методы
    export interface IAppState {
    catalog: IProductItem[];
    preview: string;
    basket: string[];
    order: IOrder;
    total: string | number;
    loading: boolean;
    }

// данный FormErrors нужен для валидации ошибки
    export type FormErrors = Partial<Record<keyof IOrder, string>>;

// интерфейс по приняют результата id
    export interface IOrderResult {
    id: string;
    }

