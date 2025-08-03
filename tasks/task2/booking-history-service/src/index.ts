import Kafka from "node-rdkafka";
import { writeBookingHistory } from "./db/BookingRepository.ts";
import { ENV } from "./env.ts";

const TOPIC_NAME = "CREATED_BOOKINGS";

Kafka.AdminClient.create({
	"metadata.broker.list": ENV.KAFKA_URL,
	"client.id": "kafka-admin",
}).createTopic({
	topic: TOPIC_NAME,
	num_partitions: 1,
	replication_factor: 1,
});

const stream = Kafka.KafkaConsumer.createReadStream(
	{
		"group.id": "kafka",
		"metadata.broker.list": ENV.KAFKA_URL,
		"allow.auto.create.topics": true, // Does not work, use admin client
	},
	{},
	{
		topics: [TOPIC_NAME],
	},
);

stream.on("data", async (message: { value: Buffer }) => {
	await writeBookingHistory(JSON.parse(message.value.toString()));
});

// Any errors we encounter, including connection errors
stream.on("event.error", (err) => {
	console.error("Error from consumer");
	console.error(err);
});
