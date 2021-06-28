// The API that update the status
import express, {Request, Response} from 'express';

interface Status  {
    num: number;
    msg: string;
}

let status:Status = {num: 0, msg: 'init'};

var router = express.Router();
let resStream:Response | null = null;
// api: /status/start-monitor: Create server-sent-event back channel for client update status
router.get('/start-monitor', function(req:Request, res:Response, next) {
    if (resStream != null){
        console.log('[Error] SSE already setup. Act: do not thing.');
        return;
    }

    console.log('start-monitor');
    resStream = res;
    resStream.setHeader('Cache-Control', 'no-cache');
    resStream.setHeader('Content-Type', 'text/event-stream');
    resStream.setHeader('Access-Control-Allow-Origin', '*'); // ok for local
    resStream.setHeader('Connection', 'keep-alive'); 
    resStream.flushHeaders(); // flush the headers to establish SSE with client
    resStream.write(`data: ${JSON.stringify(status)}\n\n`);

    // let counter = 0;
    // let interValID = setInterval(() => {
    //     if (counter >= 100) {
    //         clearInterval(interValID);
    //         res.end(); // terminates SSE session
    //         return;
    //     }
    //     res.write(`data: ${JSON.stringify({num: counter++})}\n\n`); 
    // }, 1000);

    // If client closes connection, stop sending events
    resStream.on('close', () => {
        console.log('client dropped me');
        // clearInterval(interValID);
        (resStream as Response).end();
        resStream = null;
        console.log('res.end()');
    });
});

// api: /status/increase
router.get('/increase', function(req:Request, res:Response, next) {
    status.num++;
    console.log('/increase. status = ' + JSON.stringify(status));
    if (resStream == null){
        let strMsg:string = '[server] Warn::SSE do not setup, yet. Please click [Start Monitor]. Act: do not thing.';
        console.log(strMsg);
        res.send(strMsg)
        return;
    }
    resStream.write(`data: ${JSON.stringify(status)}\n\n`);
    let strMsg:string = '[server] status increase ok.';
    console.log(strMsg);
    res.send(strMsg)
});

// api: status/update
router.get('/update', function(req:Request, res:Response, next) {
    // Step 1: Retrieve the parameters from client
    let receivedNum = req.query.num;   // get the para: num
    let receivedMsg = req.query.msg;   // get the para: Msg
    status.num = parseInt(receivedNum as string); // update
    status.msg = receivedMsg as string; // update
    console.log('/update. status = ' + JSON.stringify(status));

    // Step 2(opt): Sent back to client (SSE part)
    if (resStream == null){
        let strMsg:string = '[server] Warn::SSE do not setup, yet. Please click [Start Monitor]. Act: do not thing.';
        console.log(strMsg);
        res.send(strMsg)
        return;
    }
    resStream.write(`data: ${JSON.stringify(status)}\n\n`);

     // Step 3: Response to client
    let strMsg:string = '[server] status update ok.';
    console.log(strMsg);
    res.send(strMsg)
});

module.exports = router;

