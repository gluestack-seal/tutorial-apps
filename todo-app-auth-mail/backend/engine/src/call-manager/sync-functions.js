const { DaprClient, HttpMethod } = require('@dapr/dapr');

module.exports = async (callbacks, payload) => {

  // console.log({callbacks, payload});

  const daprPort = 3500;
  const daprHost = '127.0.0.1';

  const client = new DaprClient(daprHost, daprPort);

  for await (const callback of callbacks) {
    const { value } = callback;

    const [serviceAppId, serviceMethod] = value.split('::');
    if (!serviceAppId || !serviceMethod) {
      console.log(`Missing service app id or method from ${value}`);
      continue;
    }

    try {
      const response = await client.invoker.invoke(
        serviceAppId.replace(/-/g, ''),
        serviceMethod,
        HttpMethod.POST,
        { ...payload },
        {}
      );

      // invoke only if request is for email service
      if (payload.mailOptions) {
        await client.invoker.invoke(
          process.env.EMAIL_RESPONSE_SERVICE_NAME,
          process.env.EMAIL_RESPONSE_SERVICE_ROUTE,
          HttpMethod.POST,
          { response, payload: payload.mailOptions },
          {}
        );
      }
    } catch (err) {
      console.log(`Error invoking ${serviceAppId}::${serviceMethod}: ${err}`);
      continue;
    }
  }
};
