
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

const port = 9000;
const app = express();

const loader = require('./helpers/loader');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// App Routes
(async () => {
  // Loading Functions...
  app.use(await loader('functions'));
})();

// App Listen
app.listen(port, () => {
  console.log(`Action listening on port ${port}`)
});
