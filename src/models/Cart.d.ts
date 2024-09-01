import { BaseModel } from "../abstracts/BaseModel";
import { Products } from "./Product";
import { Users } from "./User";
import { UserDetails } from "./UserDetail";

export interface Carts extends BaseModel {
  user_id: string;
  product_id: string;
  quantity: number;
  notes?: string;
}

export interface CartList extends Carts {
  user: UserDetails
  product: Products
}