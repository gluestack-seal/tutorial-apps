module.exports = () => [
  {
    "server_name": "api"
  },
  {
    "path": "/backend/graphql",
    "proxy": {
      "instance": "graphql:8080",
      "path": "/v1/graphql"
    }
  },
  {
    "path": "/backend/hasura/(.*)",
    "proxy": {
      "instance": "graphql:8080",
      "path": "/$1"
    }
  }
];
