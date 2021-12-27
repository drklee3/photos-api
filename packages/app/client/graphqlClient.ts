import { request, GraphQLClient } from "graphql-request";

export let client: GraphQLClient = new GraphQLClient(
  "http://localhost:4000/graphql"
);

export function setApiEndpoint(endpoint: string) {
  client = new GraphQLClient(endpoint);
}
