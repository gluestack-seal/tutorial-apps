const { createEmailHistory } = require("../../graphql/mutation");
const gqlRequest = require("../../helpers/gql-request");

module.exports = async (req, res, _next) => {
  try {
    // create entity in database
    const { data, errors } = await gqlRequest({
      variables: {
        email: req.body.to,
        subject: req.body.subject,
        raw_json: JSON.stringify(req.body)
      },
      query: createEmailHistory
    })

    if (!data || !data.data || !data.data.insert_emails_histories_one) {
      const error =
        errors ||
        (data.errors && data.errors[0].message) ||
        "Something went wrong!";
      return res.json({ status: false, message: error });
    }

    return res.status(200).json({ status: true, message: "ok" });
  } catch (error) {
    return res.json({ status: false, resource: "email-response", message: error.message || error });
  }
};
