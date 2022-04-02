import {Client } from "pg";
import "dotenv/config.js";

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
  ssl: process.env.PGDATABASE_URL ? true : false
});
client.connect();
export { client };
