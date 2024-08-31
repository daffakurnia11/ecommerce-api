import { Products } from "../models/Product";
import ProductRepository from "../repositories/ProductRepository";
import ProductDetailRepository from "../repositories/ProductDetailRepository";
import BaseService from "../abstracts/BaseService";
import { ProductDetails } from "../models/ProductDetail";

class ProductService extends BaseService<Products, ProductDetails> {
  constructor() {
    super(ProductRepository, ProductDetailRepository);
  }
}

export default new ProductService();
