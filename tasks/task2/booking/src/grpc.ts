import type { ConnectRouter } from "@connectrpc/connect";
import { dbCreateBooking, dbListBookings } from "./db/BookingRepository.ts";
import { BookingService } from "./grpc-generated/booking_pb.ts";
import { kafkaProducer } from "./kafka/kafka.ts";

export default (router: ConnectRouter) =>
	router.service(BookingService, {
		async createBooking(request) {
			const createdBooking = await dbCreateBooking(
				request.userId,
				request.hotelId,
				request.promoCode,
			);

			const createdBookingWithDateString = {
				...createdBooking,
				createdAt: createdBooking.createdAt.toString(),
			};

			kafkaProducer.produce(
				"CREATED_BOOKINGS",
				null,
				Buffer.from(JSON.stringify(createdBookingWithDateString)),
			);

			return createdBookingWithDateString;
		},

		async listBookings(request) {
			return {
				bookings: (await dbListBookings(request.userId)).map((booking) => {
					return {
						...booking,
						createdAt: booking.createdAt.toString(),
					};
				}),
			};
		},
	});
