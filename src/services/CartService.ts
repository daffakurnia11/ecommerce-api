import BaseService from "../abstracts/BaseService";
import { Carts } from "../models/Cart";
import CartRepository from "../repositories/CartRepository";

class CartService extends BaseService<Carts> {
  constructor() {
    super(CartRepository);
  }

  protected getMainKeys(): Array<keyof Carts> {
    return ["user_id", "product_id", "quantity", "notes"];
  }

  // Override Update Data
  async update(
    id: string,
    data: Carts
  ): Promise<Carts> {
    if (data.quantity > 0) {
      await super.update(id, data);
    } else {
      await super.update(id, data);
      await super.softDelete(id);
    }
    return await super.get(id, true);
  }
}

export default new CartService();