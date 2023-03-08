module.exports = () => [
  {
    "server_name": "api"
  },
  {
    "path": "/backend/nodemailer/(.*)",
    "proxy": {
      "instance": "nodemailer:3500",
      "path": "/v1.0/invoke/nodemailer/method/$1"
    }
  }
];
