import { v7 as uuidv7 } from "uuid";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("product_details").del();
  await knex("products").del();

  const productId = uuidv7();

  // Inserts seed entries
  await knex("products").insert([
    {
      id: productId,
      name: "Bubble Candle",
      price: 20000,
      base64_image: null,
    },
  ]);

  await knex("product_details").insert([
    {
      id: uuidv7(),
      product_id: productId,
      description: "Bubble Candle",
      weight: 100,
      stock: 10,
      sold: 0,
    },
  ]);
}
