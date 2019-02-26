const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json())
const port = 3000;
/* serves main page */
app.get("/", function (req, res) {
  res.send('Hello my World!')
  process.send(req.body)
});

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
  res.send('Ack');
});

app.listen(port, function () {
  console.log("Listening on " + port);
});
