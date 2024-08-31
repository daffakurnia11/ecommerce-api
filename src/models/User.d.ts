import { BaseModel } from "../abstracts/BaseModel";

export interface Users extends BaseModel {
  email: string;
  password: string;
  role?: "Admin" | "User";
}