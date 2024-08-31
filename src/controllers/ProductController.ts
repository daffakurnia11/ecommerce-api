import ProductService from "../services/ProductService";
import { PRODUCT_MESSAGE } from "../utils/message";
import BaseController from "../abstracts/BaseController";

class ProductController extends BaseController {
  constructor() {
    super(ProductService, PRODUCT_MESSAGE);
  }
}

export default new ProductController();
