import { request, GraphQLClient } from "graphql-request";

export let client: GraphQLClient;

export function setApiEndpoint(endpoint: string) {
  client = new GraphQLClient(endpoint);
}
