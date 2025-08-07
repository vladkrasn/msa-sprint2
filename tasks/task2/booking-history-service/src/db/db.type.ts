export interface BookingHistoryTable {
	id: string;
	hotelId: string;
	discountPercent: number;
	price: number;
	createdAt: string;
	promoCode: string | null;
	userId: string;
}

export interface DB {
	bookingHistory: BookingHistoryTable;
}
