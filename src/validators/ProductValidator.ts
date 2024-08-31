import { body } from "express-validator";

export const productValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("weight").notEmpty().withMessage("Weight is required"),
  body("stock").notEmpty().withMessage("Stock is required"),
];
