import express, { Router } from "express";
import { handleValidation } from "../middlewares/validate";
import { ValidationChain } from "express-validator";

class BaseRoute {
  public router: Router;

  constructor(
    protected controller: any,
    protected validationMiddleware: ValidationChain[],
    protected authValidationMiddleware: any,
    protected roleValidationMiddleware: any
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    // Get All Data
    this.router.get(
      "/",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.list
    );

    // Get All Records with soft deleted
    this.router.get(
      "/record",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.record
    );

    // Get Detail Data by ID
    this.router.get(
      "/:id",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.get
    );

    // Get Detail Record with soft deleted by ID
    this.router.get(
      "/record/:id",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.getRecord
    );

    // Create New Data
    this.router.post(
      "/",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.validationMiddleware,
      handleValidation,
      this.controller.create
    );

    // Update Data by ID
    this.router.patch(
      "/:id",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.validationMiddleware,
      handleValidation,
      this.controller.update
    );

    // Restore Data by ID
    this.router.patch(
      "/:id/restore",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.restore
    );

    // Soft Delete Data by ID
    this.router.delete(
      "/:id",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.softDelete
    );

    // Hard Delete Data by ID
    this.router.delete(
      "/:id/hard",
      this.authValidationMiddleware,
      this.roleValidationMiddleware,
      this.controller.hardDelete
    );
  }
}

export default BaseRoute;
