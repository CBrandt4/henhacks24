import "dotenv/config";

if (!process.env.NEXT_PUBLIC_TRPC_API_URL) {
  throw new Error(`NEXT_PUBLIC_TRPC_API_URL is not set`);
}

const env = {
  NEXT_PUBLIC_TRPC_API_URL: process.env.NEXT_PUBLIC_TRPC_API_URL,
};
export default env;
