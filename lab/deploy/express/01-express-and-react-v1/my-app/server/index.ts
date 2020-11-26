import express from 'express';
import path from 'path';

const app = express();

// Register a middleware to serve files from the React production build folder: ../build
app.use(express.static(path.join(__dirname, '..', 'build')));

// Register a middleware to handle GET request on the '/' to response the the React production index.html
app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, '../build/index.html'));
  res.sendFile(path.join(__dirname, '../build/', 'index.html'));
});

app.listen(9000);
