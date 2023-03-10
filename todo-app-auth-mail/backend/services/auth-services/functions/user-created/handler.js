const { Glue } = require("@gluestack/glue-server-sdk-js");

module.exports = async (req, res, _next) => {
  try {
    const { body } = req;

    const user = body?.data?.new;

    const emailBody = {
      "mailOptions": {
        "from": process.env.EMAIL_FROM,
        "to": user.email,
        "subject": `Welcome ${user.name} `,
        "template": process.env.EMAIL_WELCOME_TEMPLATE,
        "data": {
          "name": user.name.trim()
        }
      },
      "transportOptions": {
        "host": process.env.EMAIL_SENDER_HOST,
        "port": process.env.EMAIL_SENDER_PORT,
        "auth": {
          "user": process.env.EMAIL_SENDER_AUTH_USER,
          "pass": process.env.EMAIL_SENDER_AUTH_PASSWORD
        }
      }
    }

    const glue = new Glue(process.env.GLUE_APP_URL.replace("localhost", "host.docker.internal"))

    const result = await glue.queue.add({
      value: `${process.env.EMAIL_SERVICE_NAME}::${process.env.EMAIL_SERVICE_ROUTE}`,
      data: emailBody
    })

    return res.status(200).json(result);
  } catch (error) {
    return res.json({ status: false, resource: "user-created", message: error.message || error });
  }
};
