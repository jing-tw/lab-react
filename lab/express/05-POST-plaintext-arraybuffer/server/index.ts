import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

// var statusAPIRouter = require('./routes/statusAPI');
// var statusRouter = require('./routes/status-api');
var dataRouter = require('./routes/data');

// var cors = require("cors");

const ReactBuildPath:string = '../client/build';
const app = express();

//var bodyParser = require('body-parser')
//app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.text());

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
app.use(express.static(path.join(__dirname, ReactBuildPath)));

// Register a router statusAPIRouter on the virtual path /statusAPI. 
// app.use('/statusAPI', statusAPIRouter);
// app.use('/status', statusRouter);
app.use('/data', dataRouter);

// Register a middleware that handle GET request on the '/' to response React production index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, ReactBuildPath + '/index.html'));
});

app.listen(9000);
console.log('Server: ok')
console.log('Test home: gio open http://localhost:9000/')
