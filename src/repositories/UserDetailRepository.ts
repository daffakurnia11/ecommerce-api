import BaseRepository from "../abstracts/BaseRepository";
import { UserDetails } from "../models/UserDetail";

class UserDetailRepository extends BaseRepository<UserDetails> {
  constructor() {
    super("user_details", {
      identifier: "user_id",
    });
  }

  // Override Get Detail Data by ID
  public async get(id: string): Promise<UserDetails> {
    return await this.selectQuery()
      .where("user_id", id)
      .select(["first_name", "last_name", "address", "gender", "phone_code", "phone_number"])
      .first();
  }
}

export default new UserDetailRepository();