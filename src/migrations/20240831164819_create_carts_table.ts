import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("carts", (table) => {
    table.uuid("id").primary().notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.uuid("product_id").notNullable().references("id").inTable("products");
    table.integer("quantity").notNullable().defaultTo(1);
    table.text("notes").nullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(null);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("carts");
}

