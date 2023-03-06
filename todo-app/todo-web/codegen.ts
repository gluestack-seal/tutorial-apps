import { CodegenConfig } from "@graphql-codegen/cli";

const SCHEMA_URL = process.env.SCHEMA_URL ?? "";

const config: CodegenConfig = {
  schema: {
    [SCHEMA_URL]: {
      headers: {
        "x-hasura-admin-secret": process.env.API_AUTHORIZATION_TOKEN ?? "",
      },
    },
  },
  documents: ["./services/graphql/*.graphql"],
  overwrite: true,
  generates: {
    "./services/__generated__/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./services/__generated__/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;