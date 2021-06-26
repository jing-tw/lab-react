// The API that update the status
import express, {Request, Response} from 'express';
// import bodyParser from 'body-parser';

interface Status  {
    num: number;
    msg: string;
}

let status:Status = {num: 0, msg: 'init'};
var router = express.Router();

var bodyParser  = require('body-parser');

// 
// In the express project, the parser provided by the body-parser is usually called in order, so that when a parser cannot satisfy the post parameter parsing condition, it can also be parsed by another parser (in some special requests, it is possible that all parser are Unable to parse).
// ref.
// https://www.programmersought.com/article/14781326503/
router.use(bodyParser.text()); // for request content-type:  text/plain
router.use(bodyParser.raw({type: "application/octet-stream"})); // for request content-type: application/octet-stream
router.use(bodyParser.raw()); // ok

// api: data/binary-resource
router.post('/binary-resource', function(req:Request, res:Response, next) {
    console.log('[server] received api: binary-resource, header = ' + JSON.stringify(req.headers))
    console.log('[server] body = ' + req.body);
    console.log('[server] Content-Type = ' + req.get('content-type'));

    // Step 2: Access the arrayBuffer data
    if(req.get('content-type') == 'application/octet-stream'){
        console.log('Get application/octet-stream type');
        let myArrayBuffer = req.body as ArrayBuffer;
        var longInt8View = new Uint8Array(myArrayBuffer);
        for (var i=0; i< longInt8View.length; i++) {
            console.log('longInt8View = ', longInt8View[i]);
        }
    }
     // Step 2: Response to client
    let strMsg:string = '[server] api: binary-resource, ok.';
    console.log(strMsg);
    res.send(strMsg)
});

module.exports = router;


// Reference
// https://stackabuse.com/get-http-post-body-in-express-js


