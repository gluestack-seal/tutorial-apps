module.exports = (req, res) => {
  return res
    .status(200)
    .json({
      status: true,
      message: 'Health check performed successfully'
    });
};