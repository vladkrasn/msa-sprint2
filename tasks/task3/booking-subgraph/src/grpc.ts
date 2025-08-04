import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { ENV } from "./env";
import { BookingService } from "./proto/grpc-generated/booking_pb";

const transport = createConnectTransport({
	baseUrl: ENV.BOOKING_SERVICE,
	httpVersion: "1.1",
});

export const bookingRPC = createClient(BookingService, transport);
