import { Api, ApiListResponse} from "./base/api";
import { IOrder,  IProductItem , IOrderResult } from "../types";

// Основной главный класс работующий в проекте с сетью, расширение базового класса Api.
export class Apilarek extends Api {
  cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options)
    this.cdn = cdn;
  }
  // метод для получения списка товаров с сервера
  getProductList() {
    return this.get('/product')
      .then((data: ApiListResponse<IProductItem>) => {
        return data.items.map((item) => ({ ...item }))
      })
  }
  // метод для отправки данных заказов на сервер
  orderProducts(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then(
        (data: IOrderResult) => data
    );
  }
}