import express, {Request, Response} from 'express';

var router = express.Router();

router.get('/', function(req:Request, res:Response, next) {
    res.send('The statusAPI was invoked.');
});

module.exports = router;

