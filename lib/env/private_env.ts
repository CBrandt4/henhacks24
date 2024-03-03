import "dotenv/config";

if (!process.env.DATABASE_HOST) {
  throw new Error(`DATABASE_HOST is not set`);
}
if (!process.env.DATABASE_USERNAME) {
  throw new Error(`DATABASE_USERNAME is not set`);
}
if (!process.env.DATABASE_PASSWORD) {
  throw new Error(`DATABASE_PASSWORD is not set`);
}

const env = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
};
export default env;
