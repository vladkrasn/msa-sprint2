import { type Kysely, sql } from "kysely";

// biome-ignore lint/suspicious/noExplicitAny: https://kysely.dev/docs/migrations
export async function up(db: Kysely<any>): Promise<void> {
	await sql`CREATE SEQUENCE booking_id_seq AS bigint`.execute(db);
	await db.schema
		.createTable("booking")
		.addColumn("id", "bigint", (col) =>
			col.defaultTo(sql`nextval('booking_id_seq')`).primaryKey(),
		)
		.addColumn("hotelId", "varchar", (col) => col.notNull())
		.addColumn("userId", "varchar", (col) => col.notNull())
		.addColumn("promoCode", "varchar")
		.addColumn("price", "double precision", (col) => col.notNull())
		.addColumn("discountPercent", "double precision", (col) => col.notNull())
		.addColumn("createdAt", "timestamptz", (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.execute();
}
