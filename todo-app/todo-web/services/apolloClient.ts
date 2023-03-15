import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });
}