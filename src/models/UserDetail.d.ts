import { BaseModel } from "../abstracts/BaseModel";

export interface UserDetails extends BaseModel {
  user_id: string;
  first_name: string;
  last_name: string;
  address: string;
  gender: "Male" | "Female" | "Other";
  phone_code: string;
  phone_number: string;
}