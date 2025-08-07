import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { ENV } from "./env";

const typeDefs = gql`
  type Hotel @key(fields: "id") {
    id: ID!
    name: String
    city: String
    stars: Int
  }

  type Query {
    hotelsByIds(ids: [ID!]!): [Hotel]
  }
`;

const resolvers = {
	Hotel: {
		// Self-resolves
	},
	Query: {
		hotelsByIds: async (_, { ids }: { ids: string[] }) => {
			const hotels: unknown[] = [];
			for (const id of ids) {
				const response = await (
					await fetch(`${ENV.HOTEL_SERVICE}/${id}`)
				).json();
				if (!response.error) {
					hotels.push(response);
				}
			}
			return hotels;
		},
	},
};

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, {
	listen: { port: 4002 },
}).then(() => {
	console.log("✅ Hotel subgraph ready at http://localhost:4002/");
});
