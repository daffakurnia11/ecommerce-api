import express, { Router } from "express";
import ProductController from "../controllers/ProductController";

class ProductRoute {
  public router: Router;
  private controller: any = ProductController;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      this.controller.list
    );

    this.router.get(
      "/:id",
      this.controller.get
    )
  }
}

export default new ProductRoute();
