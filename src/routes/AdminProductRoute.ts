import BaseRoute from "../abstracts/BaseRoute";
import ProductController from "../controllers/ProductController";
import auth from "../middlewares/auth";
import checkRole from "../middlewares/checkRole";
import { productValidation } from "../validators/ProductValidator";

class AdminProductRoute extends BaseRoute {
  constructor() {
    super(ProductController, productValidation, auth, checkRole(["Admin"]));
  }
}

export default new AdminProductRoute();
