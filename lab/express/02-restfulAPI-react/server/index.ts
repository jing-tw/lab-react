import express from 'express';
import path from 'path';

var statusAPIRouter = require('./routes/statusAPI');
// var cors = require("cors");

const app = express();

// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

// handle cors
// app.use(cors());
// Register a middleware to serve files from the React production build folder: ../build
app.use(express.static(path.join(__dirname, '../app/build')));
app.use('/statusAPI', statusAPIRouter);

// Register a middleware to handle GET request on the '/' to response the the React production index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.listen(9000);
console.log('Server: ok')
console.log('Test: gio open http://192.168.21.14:9000/statusAPI')
