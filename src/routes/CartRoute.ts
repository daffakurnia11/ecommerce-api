import BaseRoute from "../abstracts/BaseRoute";
import CartController from "../controllers/CartController";
import auth from "../middlewares/auth";
import checkRole from "../middlewares/checkRole";
import { cartValidation } from "../validators/CartValidator";

class CartRoute extends BaseRoute {
  constructor() {
    super(CartController, cartValidation, auth, checkRole(["User", "Admin"]));
  }
}

export default new CartRoute();