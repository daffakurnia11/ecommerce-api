import BaseRoute from "../abstracts/BaseRoute";
import ProductController from "../controllers/ProductController";
import { productValidation } from "../validators/ProductValidator";

class ProductRoute extends BaseRoute {
  constructor() {
    super(ProductController, productValidation);
  }
}

export default new ProductRoute();
