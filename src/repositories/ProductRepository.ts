import BaseRepository from "../abstracts/BaseRepository";
import { Products } from "../models/Product";

class ProductRepository extends BaseRepository<Products> {
  constructor() {
    super("products", {
      filter: ["name"],
    });
  }
}

export default new ProductRepository();
