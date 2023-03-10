
module.exports = (str) =>
  str.replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();