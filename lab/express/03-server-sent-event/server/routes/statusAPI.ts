import express, {Request, Response} from 'express';

var router = express.Router();

router.get('/', function(req:Request, res:Response, next) {
    console.log('Get Request');
    console.log(JSON.stringify(req.headers));  // print request headers for checking 
    //res.header("Access-Control-Allow-Origin", "*"); // Allow any origin server to request resource
    // res.send('The statusAPI was invoked.');

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Access-Control-Allow-Origin', '*'); // ok for local

    // Keep-alive connections allow the client and server to use the same TCP connection to send and receive multiple HTTP requests and responses.
    // ref. https://blog.insightdatascience.com/learning-about-the-http-connection-keep-alive-header-7ebe0efa209d
    res.setHeader('Connection', 'keep-alive'); 
    res.flushHeaders(); // flush the headers to establish SSE with client

    let counter = 0;
    let interValID = setInterval(() => {
        counter++;
        if (counter >= 10) {
            clearInterval(interValID);
            res.end(); // terminates SSE session
            return;
        }
        res.write(`data: ${JSON.stringify({num: counter})}\n\n`); // res.write() instead of res.send()
    }, 1000);

    // If client closes connection, stop sending events
    res.on('close', () => {
        console.log('client dropped me');
        clearInterval(interValID);
        res.end();
        console.log('res.end()');
    });
});

module.exports = router;

