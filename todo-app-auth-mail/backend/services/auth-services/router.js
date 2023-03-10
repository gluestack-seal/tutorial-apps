module.exports = () => [
  {
    "server_name": "api"
  },
  {
    "path": "/backend/authservices/(.*)",
    "proxy": {
      "instance": "authservices:3500",
      "path": "/v1.0/invoke/authservices/method/$1"
    }
  }
];
