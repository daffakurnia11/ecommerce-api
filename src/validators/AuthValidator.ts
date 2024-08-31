import { body } from "express-validator";

export const loginValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("phone_code").notEmpty().withMessage("Phone code is required"),
  body("phone_number").notEmpty().withMessage("Phone number is required"),
];
