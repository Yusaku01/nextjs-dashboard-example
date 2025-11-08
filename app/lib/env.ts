import { z } from "zod";

const EnvSchema = z.object({
  POSTGRES_URL: z.string().min(1, "POSTGRES_URL is required"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  // Throw a clear error early if required env vars are missing
  const issues = parsed.error.issues.map((i) => i.message).join(", ");
  throw new Error(`Invalid environment variables: ${issues}`);
}

export const POSTGRES_URL = parsed.data.POSTGRES_URL;
