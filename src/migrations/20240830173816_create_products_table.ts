import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("name", 255).notNullable();
    table.float("price", 10, 2).notNullable().defaultTo(0.0);
    table
      .enum("available", ["In Stock", "Out of Stock"])
      .notNullable()
      .defaultTo("In Stock");
    table.text("base64_image").nullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("products");
}
