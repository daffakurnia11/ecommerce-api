import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.enum("role", ["Admin", "User"]).notNullable().defaultTo("User");
    table.timestamps(true, true);
    table.timestamp("deleted_at").defaultTo(null);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

