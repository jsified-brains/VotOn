import * as fs from 'fs';
import * as path from 'path';
import * as DBUtils from '../../modules/dynamoDBUtils';

export async function add(req, res){
    res.json("Feature saved");
}

export async function getById(request, response){
    console.log("processing Features api call");
    try {
        //Call DynamoDB to get feature
        let data = await DBUtils.getDataById('Features','featureId',request.params.id)
        console.log("sending data");
        
        return response.status(200).json(data);       
    } catch(err){
        return response.status(500).json(err);
    }
}

export async function get(request, response){
    console.log("processing features api call");
    try{
        let data = await DBUtils.getAllItems('Features');
        console.log("sending data");
        response.status(200).json(data);
    }catch(error ){
        console.log("error in fetching data"+error);
        response.status(200).json(error);
    }

}

