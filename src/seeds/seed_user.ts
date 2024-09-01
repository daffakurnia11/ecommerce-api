import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_details").del();
    await knex("users").del();

    const userId = uuidv7();

  const password = await bcrypt.hash("password", 12)

  // Inserts seed entries
  await knex("users").insert([
    {
      id: userId,
      email: "admin@test.com",
      password,
      role: "Admin"
    },
  ]);

  await knex("user_details").insert([
    {
      id: uuidv7(),
      user_id: userId,
      first_name: "Admin",
      last_name: "Boilerplate",
      address: "Sidoarjo, East Java",
      gender: "Male",
      phone_code: "62",
      phone_number: "123456789",
    },
  ]);
};
