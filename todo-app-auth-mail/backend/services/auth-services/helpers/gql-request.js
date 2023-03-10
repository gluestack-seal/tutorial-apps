const axios = require("axios");

module.exports = async ({ variables, query }) => {
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`,
  };

  return await axios({
    url: `${process.env.HASURA_GRAPHQL_URL}`,
    method: "POST",
    headers: headers,
    data: {
      query,
      variables,
    },
  });
}