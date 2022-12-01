import { Client } from "pg";
import "dotenv/config.js";

const client = new Client({
  connectionString: process.env.PGDATABASE_URL
});

client.connect();

export { client };
