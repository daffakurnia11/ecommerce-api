import { BaseModel } from "../abstracts/BaseModel";

export interface ProductDetails extends BaseModel {
  product_id: string;
  description: string;
  weight: number;
  stock: number;
  sold: number;
}
