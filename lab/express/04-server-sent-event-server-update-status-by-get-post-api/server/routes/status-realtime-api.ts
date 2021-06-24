// The API that update the status
import express, {Request, Response} from 'express';
var router = express.Router();
let counter:number = 0;
let resStream:Response | null = null;
router.get('/start-monitor', function(req:Request, res:Response, next) {
    if (resStream != null){
        console.log('[Error] SSE already setup. Act: do not thing.');
        return;
    }

    console.log('start-monitor');
    resStream = res;
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*'); // ok for local
    res.setHeader('Connection', 'keep-alive'); 
    res.flushHeaders(); // flush the headers to establish SSE with client
    res.write(`data: ${JSON.stringify({num: counter})}\n\n`); // res.write() instead of res.send()
    

    // let counter = 0;
    // let interValID = setInterval(() => {
    //     if (counter >= 100) {
    //         clearInterval(interValID);
    //         res.end(); // terminates SSE session
    //         return;
    //     }
    //     res.write(`data: ${JSON.stringify({num: counter++})}\n\n`); // res.write() instead of res.send()
    // }, 1000);

    // If client closes connection, stop sending events
    res.on('close', () => {
        console.log('client dropped me');
        // clearInterval(interValID);
        res.end();
        resStream = null;
        console.log('res.end()');
    });
});


router.get('/increase', function(req:Request, res:Response, next) {
    counter++;
    console.log('/increase. counter = ' + counter);
    if (resStream == null){
        let strMsg:string = '[server] Warn::SSE do not setup, yet. Please click [Start Monitor]. Act: do not thing.';
        console.log(strMsg);
        res.send(strMsg)
        return;
    }
    resStream.write(`data: ${JSON.stringify({num: counter})}\n\n`);
    let strMsg:string = '[server] status update ok.';
    console.log(strMsg);
    res.send(strMsg)
});

module.exports = router;

