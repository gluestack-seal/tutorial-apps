import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApp } from "../context/app";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../services/apolloClient";
import { DataProvider } from "../context/data";

import { GlueProvider, Glue } from "@gluestack/glue-client-sdk-react";
import Toast from "../components/Toast";
import { AppProvider } from "../context/app";

function MyApp({ Component, pageProps }: AppProps) {
  const glue = new Glue({BASE_URL: process.env.BASE_URL || ""});
  return (
    <>
      <GlueProvider glue={glue}>
        <AppProvider>
          <Child>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </Child>
        </AppProvider>
      </GlueProvider>
    </>
  );
}

const Child = ({ children }: { children: React.ReactNode }) => {
  const { toast }: any = useApp();

  return (
    <ApolloProvider client={createApolloClient()}>
      <DataProvider>
        <Toast toast={toast} />
        {children}
      </DataProvider>
    </ApolloProvider>
  );
};

export default MyApp;
