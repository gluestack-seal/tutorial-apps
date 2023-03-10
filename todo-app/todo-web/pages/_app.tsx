import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { DataProvider } from "../context/data";
import { createApolloClient } from "../services/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Child>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </Child>
  );
}

const Child = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <DataProvider>{children}</DataProvider>
    </ApolloProvider>
  );
};

export default MyApp;
