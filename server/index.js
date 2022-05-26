const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.listen(3080, () => {
console.log("server listening on port 3080");
});