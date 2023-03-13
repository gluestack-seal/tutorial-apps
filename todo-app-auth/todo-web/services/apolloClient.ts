import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient(token?: string | undefined | null) {
  if (token) {
    return new ApolloClient({
      ssrMode: false,
      uri: (process.env.NEXT_PUBLIC_API_URL ?? "").replaceAll("localhost", "host.docker.internal"),
      cache: new InMemoryCache(),
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } else {
    return new ApolloClient({
      ssrMode: false,
      uri: (process.env.NEXT_PUBLIC_API_URL ?? "").replaceAll("localhost", "host.docker.internal"),
      cache: new InMemoryCache(),
    });
  }
}
