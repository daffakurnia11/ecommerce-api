import BaseRepository from "../abstracts/BaseRepository";
import { Users } from "../models/User";

class UserRepository extends BaseRepository<Users> {
  constructor() {
    super("users", {
      filter: ["email"],
    });
  }

  // Override Get Detail Data by ID
  public async get(id: string): Promise<Users> {
    return await this.selectQuery()
      .where("id", id)
      .select(["id", "email", "role"])
      .first();
  }
}

export default new UserRepository();
