import { Kysely } from "kysely";
import { config } from "./db.ts";
import type { DB } from "./db.type.ts";

const kysely = new Kysely<DB>(config);

export async function dbCreateBooking(
	userId: string,
	hotelId: string,
	promoCode: string,
) {
	return kysely
		.insertInto("booking")
		.values({
			userId,
			hotelId,
			promoCode,
			price: 1,
			discountPercent: 2,
			createdAt: new Date(),
		})
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function dbListBookings(userId: string) {
	return kysely
		.selectFrom("booking")
		.where("booking.userId", "=", userId)
		.selectAll()
		.execute();
}
