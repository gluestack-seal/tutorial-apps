import { Glue } from "@gluestack/glue-client-sdk-react";

const glue = new Glue({
  BASE_URL: process.env.APP_BASE_URL || "",
  AUTH: {},
});

export default glue;
