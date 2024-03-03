import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import env from "../env/private_env";
import * as schema from "../schema/schema";

const client = new Client({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
});

const database = drizzle(client, {
  schema: { ...schema },
});
export default database;
