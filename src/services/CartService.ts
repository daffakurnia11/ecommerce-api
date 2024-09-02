import BaseService from "../abstracts/BaseService";
import { NotFoundError } from "../middlewares/errorHandler";
import { Carts } from "../models/Cart";
import CartRepository from "../repositories/CartRepository";
import ProductRepository from "../repositories/ProductRepository";

class CartService extends BaseService<Carts> {
  constructor() {
    super(CartRepository);
  }

  protected getMainKeys(): Array<keyof Carts> {
    return ["user_id", "product_id", "quantity", "notes"];
  }

  async create(data: Carts): Promise<Carts> {
    const product = await ProductRepository.get(data.product_id);

    if (!product) throw new NotFoundError("Product not found");
    
    return await super.create(data);
  }

  // Override Update Data
  async update(
    id: string,
    data: Carts
  ): Promise<Carts> {
    const product = await ProductRepository.get(data.product_id);

    if (!product) throw new NotFoundError("Product not found");
    
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