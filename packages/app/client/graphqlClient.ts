import { request, GraphQLClient } from "graphql-request";

export let client: GraphQLClient = new GraphQLClient("http://localhost:8080");

export function setApiEndpoint(endpoint: string) {
  client = new GraphQLClient(endpoint);
}
