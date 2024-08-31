import { BaseModel } from "../abstracts/BaseModel";

export interface Products extends BaseModel {
  name: string;
  price: number;
  available: "In Stock" | "Out of Stock";
  base64_image?: string;
}

export interface ProductDetail extends Products {
  detail: {
    id: string;
    description: string;
    weight: number;
    stock: number;
    sold: number;
  };
}
