import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { bookingRPC } from "./grpc";
import { GraphQLError } from "graphql";

const typeDefs = gql`
  type Booking @key(fields: "id") {
    id: ID!
    userId: String!
    hotelId: String!
    promoCode: String
    discountPercent: Int
  }

  type Query {
    bookingsByUser(userId: String!): [Booking]
  }

`;

const resolvers = {
	Query: {
		bookingsByUser: async (
			_,
			{ userId }: { userId: string },
			{ requestorUserId }: { requestorUserId: string },
		) => {
			if (requestorUserId !== userId) {
				throw new GraphQLError("You are not authorized");
			}
			return (await bookingRPC.listBookings({ userId })).bookings;
		},
	},
	Booking: {
		// Self-resolves
	},
};

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
	includeStacktraceInErrorResponses: false,
});

startStandaloneServer(server, {
	listen: { port: 4001 },
	context: async ({ req }) => {
		return { requestorUserId: req.headers.userid };
	},
}).then(() => {
	console.log("✅ Booking subgraph ready at http://localhost:4001/");
});
