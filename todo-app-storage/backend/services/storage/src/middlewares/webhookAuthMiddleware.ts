const axios = require("axios");
import Locals from "../providers/locals";

export default function webhookAuthMiddleware(req: any, res: any, next: any) {
  const { headers, body } = req;
  if (headers["content-length"]) delete headers["content-length"];

  axios({
    url: Locals.config().middleware.webhook.url,
    method: "POST",
    headers: headers,
    data: body,
  })
  .then((response: any) => {
    if (response.status === 200) {
      next();
    } else {
      return res.status(response.status).send(response.data);
    }
  })
  .catch((error: any) => {
    return res.status(401).send({ error: error.response.data });
  });
}
