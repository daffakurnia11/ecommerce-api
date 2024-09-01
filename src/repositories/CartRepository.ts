import BaseRepository from "../abstracts/BaseRepository";
import { CartList, Carts } from "../models/Cart";
import ProductRepository from "./ProductRepository";
import UserDetailRepository from "./UserDetailRepository";

class CartRepository extends BaseRepository<Carts> {
  constructor() {
    super("carts", {
      filter: ["user_id"],
    });
  }

  // Override Get All Data
  public async list(
    filter: Record<string, string>,
    withDeleted: boolean = false,
    offset?: number | undefined,
    limit?: number | undefined
  ): Promise<CartList[]> {
    const data = await super.list(filter, withDeleted, offset, limit);

    const result = await Promise.all(
      data.map(async (cart: Carts) => {
        const { user_id, product_id, ...cartWithoutIds } = cart;

        const user = await UserDetailRepository.get(user_id);
        const product = await ProductRepository.get(product_id);

        return {
          ...cartWithoutIds,
          user,
          product,
        };
      })
    );

    return result as CartList[];
  }
}

export default new CartRepository();
