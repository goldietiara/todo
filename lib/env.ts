import zod from "zod";

const envSchema = zod.object({
  NEXT_PUBLIC_GRAFBASE_API_KEY: zod.string().nonempty(),
  NEXT_PUBLIC_GRAFBASE_API_URL: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTH_SECRET: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
