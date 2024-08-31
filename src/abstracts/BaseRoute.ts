import express, { Router } from "express";
import { handleValidation } from "../middlewares/validate";
import { ValidationChain } from "express-validator";

class BaseRoute {
  public router: Router;

  constructor(
    private controller: any,
    private validationMiddleware: ValidationChain[]
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get All Data
    this.router.get("/", this.controller.list);

    // Get All Records with soft deleted
    this.router.get("/record", this.controller.record);

    // Get Detail Data by ID
    this.router.get("/:id", this.controller.get);

    // Get Detail Record with soft deleted by ID
    this.router.get("/record/:id", this.controller.getRecord);

    // Create New Data
    this.router.post(
      "/",
      this.validationMiddleware,
      handleValidation,
      this.controller.create
    );

    // Update Data by ID
    this.router.patch(
      "/:id",
      this.validationMiddleware,
      handleValidation,
      this.controller.update
    );

    // Restore Data by ID
    this.router.patch("/:id/restore", this.controller.restore);

    // Soft Delete Data by ID
    this.router.delete("/:id", this.controller.softDelete);

    // Hard Delete Data by ID
    this.router.delete("/:id/hard", this.controller.hardDelete);
  }
}

export default BaseRoute;
