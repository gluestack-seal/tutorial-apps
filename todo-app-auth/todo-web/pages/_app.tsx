import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getUser, UserProvider } from "../context/user";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../services/apolloClient";
import { DataProvider } from "../context/data";
import { GlueProvider, Glue } from "@gluestack/glue-client-sdk-react";

function MyApp({ Component, pageProps }: AppProps) {
  const glue = new Glue({BASE_URL: process.env.BASE_URL || ""});
  return (
    <GlueProvider glue={glue}>
      <UserProvider>
        <Child>
          <Component {...pageProps} />
        </Child>
      </UserProvider>
    </GlueProvider>
  );
}

const Child = ({ children }: { children: React.ReactNode }) => {
  const { user }: any = getUser();

  return (
    <ApolloProvider client={createApolloClient(user?.token)}>
      <DataProvider>{children}</DataProvider>
    </ApolloProvider>
  );
};

export default MyApp;
