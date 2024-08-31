import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user_details", (table) => {
    table.uuid("id").primary().notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("users");
    table.string("first_name").notNullable();
    table.string("last_name").nullable();
    table.text("address").notNullable();
    table
      .enum("gender", ["Male", "Female", "Other"])
      .notNullable()
      .defaultTo("Other");
    table.string("phone_code").notNullable();
    table.string("phone_number").notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_details");
}
