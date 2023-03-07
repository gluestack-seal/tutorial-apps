import { Glue } from "@gluestack/glue-client-sdk-react";

const glue = new Glue({
  BASE_URL: "http://localhost:10088",
  AUTH: {},
});

export default glue;
