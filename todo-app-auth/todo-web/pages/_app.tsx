import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getUser, UserProvider } from "../context/user";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../services/apolloClient";
import { DataProvider } from "../context/data";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Child>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </Child>
    </UserProvider>
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
