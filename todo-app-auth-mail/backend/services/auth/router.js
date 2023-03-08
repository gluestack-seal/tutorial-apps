module.exports = () => [
  {
    "server_name": "api"
  },
  {
    "path": "/backend/auth/(.*)",
    "proxy": {
      "instance": "auth:3500",
      "path": "/v1.0/invoke/auth/method/$1"
    }
  }
];
