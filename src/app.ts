import * as express from 'express';
import * as path from 'path';
import * as minimist from 'minimist';
import * as BodyParser from 'body-parser';
import * as AwsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as AWS from 'aws-sdk';
import * as DBUtils from './modules/dynamoDBUtils';
import { Observable } from 'rxjs';
import AppRoutes from './modules';

let app = express();
let subpath = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(AwsServerlessExpressMiddleware.eventContext());
app.use("/v1", subpath);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Simple get call for testing project setup
app.get('/', function (req, res) {
    res.send({"msg":"VotOn! "});
});

AppRoutes(app);
// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(1337, () => console.log('ready on port 1337') );
// Export your express server so you can import it in the lambda function.
export = app;
  