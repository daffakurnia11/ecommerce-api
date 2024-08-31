import Knex from "knex";
import { config } from "./index";

const knex = Knex({
  client: "mysql2",
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  },
});

export default knex;
