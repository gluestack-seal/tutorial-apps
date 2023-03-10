
module.exports = (req, res) => {
  const { headers, body }  = req;

  // do something with the headers and body
  // perform your custom business logic

  console.log({ headers, body });

  return res.status(200).json({
    status: true,
    message: 'Ok'
  });
};
