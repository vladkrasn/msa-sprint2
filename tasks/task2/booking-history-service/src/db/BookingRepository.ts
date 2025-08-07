import { Kysely } from "kysely";
import { config } from "./db.ts";
import type { BookingHistoryTable, DB } from "./db.type.ts";

const kysely = new Kysely<DB>(config);

export async function writeBookingHistory(event: BookingHistoryTable) {
	return kysely
		.insertInto("bookingHistory")
		.values(event)
		.returningAll()
		.executeTakeFirstOrThrow();
}
