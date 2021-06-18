import express, {Request, Response} from 'express';

var router = express.Router();

router.get('/', function(req:Request, res:Response, next) {
    console.log(JSON.stringify(req.headers));  // print request headers for checking 
    //res.header("Access-Control-Allow-Origin", "*"); // Allow any origin server to request resource
    res.send('The statusAPI was invoked.');
});

module.exports = router;

