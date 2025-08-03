import type { ColumnType, GeneratedAlways } from "kysely";

export interface BookingTable {
	id: GeneratedAlways<string>;
	hotelId: string;
	discountPercent: number;
	price: number;
	createdAt: ColumnType<string, Date, never>;
	promoCode: string;
	userId: string;
}

export interface DB {
	booking: BookingTable;
}
