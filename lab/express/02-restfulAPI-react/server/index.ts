import express from 'express';
import path from 'path';

var statusAPIRouter = require('./routes/statusAPI');
var cors = require("cors");

const app = express();

// handle cors
app.use(cors());
// Register a middleware to serve files from the React production build folder: ../build
app.use(express.static(path.join(__dirname, '../app/build')));
app.use('/statusAPI', statusAPIRouter);

// Register a middleware to handle GET request on the '/' to response the the React production index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.listen(9000);
console.log('Server: ok')
console.log('Test: gio open http://localhost:9000/statusAPI')
