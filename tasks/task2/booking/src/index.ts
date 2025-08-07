import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import { fastify } from "fastify";
import routes from "./grpc.ts";

async function main() {
	const server = fastify({
		logger: true,
	});
	await server.register(fastifyConnectPlugin, {
		routes,
	});
	server.get("/", (_, reply) => {
		reply.type("text/plain");
		reply.send(server.printRoutes());
	});
	server.ready(() => {
		console.log(server.printRoutes());
	});

	await server.listen({ host: "0.0.0.0", port: 3000 });
}

void main();
