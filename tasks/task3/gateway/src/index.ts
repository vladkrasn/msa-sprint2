import {
	ApolloGateway,
	IntrospectAndCompose,
	RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ENV } from "./env";

// The `serviceList` option is deprecated and will be removed in a future version of `@apollo/gateway`.
// Please migrate to its replacement `IntrospectAndCompose`. More information on `IntrospectAndCompose` can be found in the documentation.

const gateway = new ApolloGateway({
	supergraphSdl: new IntrospectAndCompose({
		subgraphs: [
			{ name: "booking", url: ENV.BOOKING_SUBGRAPH },
			{ name: "hotel", url: ENV.HOTEL_SUBGRAPH },
		],
	}),
	buildService({ url }) {
		return new RemoteGraphQLDataSource({
			url,
			willSendRequest({ request, context }) {
				request?.http?.headers.set("userid", context?.userid); // You gotta do it manually it seems
			},
		});
	},
});

const server = new ApolloServer({ gateway });

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req }) => {
		return { userid: req.headers.userid };
	},
}).then(({ url }) => {
	console.log(`🚀 Gateway ready at ${url}`);
});
