import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

/**
 * Validates .env file on startup and provides types
 */
const envSchema = z.object({
	POSTGRES_URL: z.url(),
	KAFKA_URL: z.url(),
});

/**
 * Validated .env variables
 */
export const ENV = envSchema.parse(process.env);
