import * as AwsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as AWS from 'aws-sdk';
import { Observable, Subject, of } from 'rxjs';

AWS.config.update({ region: 'us-east-1' });

let config = {
    "apiVersion": "2012-08-10",
    // "accessKeyId": "abcde",
    // "secretAccessKey": "abcde",
    "region": "us-east-1",
    "endpoint": "http://localhost:8000"
};

let dynamodb = new AWS.DynamoDB(config);

export function getDataById(table, tableKey, dataItemId) {

    return new Promise(function (resolve, reject) {
        let tableData = {};
        let dbParams: AWS.DynamoDB.GetItemInput = {
            TableName: table,
            Key: {
                [tableKey]: {
                    S: dataItemId
                }
            }
        };
        console.log("params: " + JSON.stringify(dbParams));
        dynamodb.getItem(dbParams, function (error, data) {
            if (error) {
                console.log('No data found: ', error);
                reject("Unable to fetch data");
            } else {
                if (data) {
                    console.log('Data is : ' + JSON.stringify(data));
                    let tableItemData = data.Item;
                    let parsedData = mapper(tableItemData);
                    console.log('Parsed data is : ' + JSON.stringify(parsedData));
                    
                    resolve(parsedData);

                }else{
                    console.log('No data found: ', error);
                    reject("Unable to fetch data");
                }
            }
        });


    });

    
}

export function getAllItems(table) {
    
        return new Promise(function (resolve, reject) {
            let docClient = new AWS.DynamoDB.DocumentClient();
            let tableData = {};
            let dbParams: AWS.DynamoDB.ScanInput = {
                TableName: table
            };
            console.log("params: " + JSON.stringify(dbParams));
            dynamodb.scan(dbParams, function (error, data) {
                if (error) {
                    console.log('No data found: ', error);
                    reject("Unable to fetch data");
                } else {
                    if (data) {
                        console.log('Data is : ' + JSON.stringify(data));
                        if(data.Items){
                            let parsedItems = [];
                            data.Items.forEach(tableItemData => {
                                let parsedData = mapper(tableItemData);
                                console.log('Parsed data is : ' + JSON.stringify(parsedData));
                                parsedItems.push(parsedData);
                                
                            });
                            resolve(parsedItems);
                        }else{
                            console.log('No data found: ', error);
                            reject("Unable to fetch data");
                        }
                    }else{
                        console.log('No data found: ', error);
                        reject("Unable to fetch data");
                    }
                }
            });
        });
    }

function mapper(data) {

    let S = "S";
    let SS = "SS";
    let NN = "NN";
    let NS = "NS";
    let BS = "BS";
    let BB = "BB";
    let N = "N";
    let BOOL = "BOOL";
    let NULL = "NULL";
    let M = "M";
    let L = "L";

    if (isObject(data)) {
        let keys = Object.keys(data);
        console.log('keys are: '+keys);
        while (keys.length) {
            let key = keys.shift();
            let types = data[key];

            if (isObject(types) && types.hasOwnProperty(S)) {
                data[key] = types[S];
            } else if (isObject(types) && types.hasOwnProperty(N)) {
                data[key] = parseFloat(types[N]);
            } else if (isObject(types) && types.hasOwnProperty(BOOL)) {
                data[key] = types[BOOL];
            } else if (isObject(types) && types.hasOwnProperty(NULL)) {
                data[key] = null;
            } else if (isObject(types) && types.hasOwnProperty(M)) {
                data[key] = mapper(types[M]);
            } else if (isObject(types) && types.hasOwnProperty(L)) {
                data[key] = mapper(types[L]);
            } else if (isObject(types) && types.hasOwnProperty(SS)) {
                data[key] = types[SS];
            } else if (isObject(types) && types.hasOwnProperty(NN)) {
                data[key] = types[NN];
            } else if (isObject(types) && types.hasOwnProperty(BB)) {
                data[key] = types[BB];
            } else if (isObject(types) && types.hasOwnProperty(NS)) {
                data[key] = types[NS];
            } else if (isObject(types) && types.hasOwnProperty(BS)) {
                data[key] = types[BS];
            }
        }
    }


    return data;

    function isObject(value) {
        return typeof value === "object" && value !== null;
    }
}

export function getItemById(table, tableKey, dataItemId) {
    
        // return new Promise(function (resolve, reject) {
            let tableData = {};
            let dbParams: AWS.DynamoDB.GetItemInput = {
                TableName: table,
                Key: {
                    [tableKey]: {
                        S: dataItemId
                    }
                }
            };
            console.log("params: " + JSON.stringify(dbParams));
            dynamodb.getItem(dbParams, function (error, data) {
                if (error) {
                    console.log('No data found: ', error);
                    // reject("Unable to fetch data");
                } else {
                    if (data) {
                        console.log('Data is : ' + JSON.stringify(data));
                        let tableItemData = data.Item;
                        let parsedData = mapper(tableItemData);
                        console.log('Parsed data is : ' + JSON.stringify(parsedData));
                        
                        // resolve(parsedData);
    
                    }
                }
            // });
    
    
        });
    
        
    }
    