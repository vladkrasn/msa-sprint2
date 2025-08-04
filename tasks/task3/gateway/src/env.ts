import z from "zod";

/**
 * Validates .env file on startup and provides types
 */
const envSchema = z.object({
	BOOKING_SUBGRAPH: z.url(),
	HOTEL_SUBGRAPH: z.url(),
});

/**
 * Validated .env variables
 */
export const ENV = envSchema.parse(process.env);
