import z from "zod";

/**
 * Validates .env file on startup and provides types
 */
const envSchema = z.object({
	BOOKING_SERVICE: z.url(),
});

/**
 * Validated .env variables
 */
export const ENV = envSchema.parse(process.env);
