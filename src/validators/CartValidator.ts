import { body } from "express-validator";

export const cartValidation = [
  body("product_id").notEmpty().withMessage("Product is required"),
  body("quantity").notEmpty().withMessage("Quantity is required"),
];
