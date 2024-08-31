import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("product_details", (table) => {
    table.uuid("id").primary().notNullable();
    table.uuid("product_id").notNullable().references("id").inTable("products");
    table.text("description").nullable();
    table.float("weight", 10, 2).notNullable().defaultTo(0.0);
    table.integer("stock").notNullable().defaultTo(0);
    table.integer("sold").notNullable().defaultTo(0);
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("product_details");
}
