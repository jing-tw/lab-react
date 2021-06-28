// The API that update the status
import express, {Request, Response} from 'express';

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
router.use(bodyParser.text()); // for parsing req.body with text/plain
router.use(bodyParser.raw({type: "application/octet-stream"})); // for parsing req.body with application/octet-stream
// router.use(bodyParser.raw()); // ok
router.use(bodyParser.json({type: 'application/json'})); // for parsing req.body with text/plain ok, application/json
//router.use(bodyParser.json()); // ok, xhr.setRequestHeader('Content-Type', 'application/json'); 

// api: data/status_json
// router.post('/status_json', function(req:Request, res:Response, next) {
router.post('/status_json', bodyParser.json(), function(req:Request, res:Response, next) {
    console.log('[server] received, header = ' + JSON.stringify(req.headers))
    console.log('[server] body = ' + req.body);
    console.log('[server] Content-Type = ' + req.get('content-type'));

    // Step 2: Check JSON
    const Ajv = require("ajv/dist/jtd")
    const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

    const schema = {
        properties: {
            num: {type: "int32"}, 
            msg: {type: "string"}
        },
    }


    const validate = ajv.compile(schema)
    // Test validator
      console.log('should be valid', validate({num: 0, msg: 'world'})) // ok
      let statusMy2:Status = {num: 0, msg: 'world'};
      console.log('should be valid', validate(statusMy2)) 
      console.log('should be valid req.body', validate(req.body)) 
    if(!validate(req.body)){
        let strMsg:string = '[server] ERROR. validate(req.body).\nReceived:' + JSON.stringify(req.body);
        console.log(strMsg);
        console.log('v error = ' + JSON.stringify(validate.errors));
        res.send(strMsg)
        return;
    }
    console.log('[server] JSON schema: ok.');
   

    let statusMy:Status = req.body as Status;

    // Step 3: Access data
    for (var prop in statusMy) {
        if (statusMy.hasOwnProperty(prop)) {
            console.log('prop = ' + prop + ', value = ' + statusMy[prop as keyof Status]);
        }
    }


    // Step 4: Response to client
    let strMsg:string = '[server] response. statusMy = ' + JSON.stringify(statusMy);
    console.log(strMsg);
    res.send(strMsg)
});

// api: data/resource_binary_text
/* Note: 
   // [1] access the req.body with application/octet-stream
   router.use(bodyParser.raw({type: "application/octet-stream"})); 

   // [2] for enable access the req.body with text/plain
   router.use(bodyParser.text());
*/
router.post('/resource_binary_text', function(req:Request, res:Response, next) {
    console.log('[server] received api: resource_binary_text, header = ' + JSON.stringify(req.headers))
    console.log('[server] body = ' + req.body);
    console.log('[server] Content-Type = ' + req.get('content-type'));

    let bOk:boolean = false;
    // Step 2: Access the arrayBuffer data
    if(req.get('content-type') == 'application/octet-stream'){
        console.log('[server] Get content-type: application/octet-stream');
        let myArrayBuffer = req.body as ArrayBuffer;
        var longInt8View = new Uint8Array(myArrayBuffer);
        for (var i=0; i< longInt8View.length; i++) {
            console.log('[server] longInt8View = ', longInt8View[i]);
        }

        bOk = true;
    }

    if(!bOk && req.get('content-type') == 'text/plain'){
        console.log('[server] Get content-type: text/plain');
        console.log('[esrver] req.body = ' + req.body);
        bOk = true;
    }




    if(!bOk){
        let strMsg:string = '[server] ERROR. ontent-type != application/octet-stream.\nReceived:' + JSON.stringify(req.body);
        console.log(strMsg);
        res.send(strMsg)
        return;
    }
    
    // Step 2: Response to client
    let strMsg:string = '[server] api: resource_binary_text, ok.';
    console.log(strMsg);
    res.send(strMsg)
});


module.exports = router;


// Reference
// https://stackabuse.com/get-http-post-body-in-express-js


