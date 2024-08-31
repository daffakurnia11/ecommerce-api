import express, { Router } from "express";
import { handleValidation } from "../middlewares/validate";
import AuthController from "../controllers/AuthController";
import { loginValidation, registerValidation } from "../validators/AuthValidator";

class AuthRoute {
  public router: Router;
  private controller: any = AuthController;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/register",
      registerValidation,
      handleValidation,
      this.controller.register
    );

    this.router.post(
      "/login",
      loginValidation,
      handleValidation,
      this.controller.login
    )

    this.router.post(
      "/refresh-token",
      this.controller.refreshToken
    )
  }
}

export default new AuthRoute();
