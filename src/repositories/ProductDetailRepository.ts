import BaseRepository from "../abstracts/BaseRepository";
import { ProductDetails } from "../models/ProductDetail";

class ProductDetailRepository extends BaseRepository<ProductDetails> {
  constructor() {
    super("product_details", {
      identifier: "product_id",
    });
  }

  // Override Get Detail Data by Product ID
  public async get(
    id: string,
    withDeleted: boolean = false
  ): Promise<ProductDetails> {
    return await this.selectQuery(withDeleted)
      .select(["id", "description", "weight", "stock", "sold"])
      .where("product_id", id)
      .first();
  }
}

export default new ProductDetailRepository();
