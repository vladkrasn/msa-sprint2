import Kafka from "node-rdkafka";
import { ENV } from "../env.ts";

export const kafkaProducer = new Kafka.Producer({
	"metadata.broker.list": ENV.KAFKA_URL,
	dr_cb: true,
});

// Connect to the broker manually
kafkaProducer.connect();
console.log(`Is it connected? ${kafkaProducer.isConnected()}`);

// Any errors we encounter, including connection errors
kafkaProducer.on("event.error", (err) => {
	console.error("Error from producer");
	console.error(err);
});

kafkaProducer.setPollInterval(100);
