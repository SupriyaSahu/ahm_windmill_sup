const request = require("request-promise");
 const request_sync = require("sync-request");
var token = require('basic-auth-token');
const iot = {}
const request_async = require('request');
const fetch = require('node-fetch');
//const JSON = require('json');



const BasicToken = token("root", "fQmSxvtb8BgGZ09");

//Get IOT Devices
iot.getIOTDevices = async () => {

    device_Array = [];

    let result = await getIOT_Devices_Data();

    result.forEach(element => {
        var dateTime = new Date(element.creationTimestamp).toISOString().split('T')
        var date =  dateTime[0];
        var time = dateTime[1].slice(0,8)
        device_Array.push({
            id: element.id,
            alternateId: element.alternateId,
            name: element.name,
            gatewayId: element.gatewayId,
            creationTimestamp: (date + ' ' + time),
            online: element.online           
        })
 

    });

    return device_Array;

}

iot.getIOTSensors = async () => {
    device_Array = [];
    let result = await getIOT_Sensors_Data();
    result.forEach(element => {
   
        device_Array.push({
            id: element.id,
            alternateId: element.alternateId,
            name:element.name         
        })
 

    });
    return device_Array;
}
iot.getIOTCapabilities = async () => {
    device_Array = [];
    let result = await getIOT_Capabilities_Data();
    result.forEach(element => {
       
        device_Array.push({
            id: element.id,
            alternateId: element.alternateId,
            name:element.name
                               
        })

    });
    return device_Array;
}

iot.getIOTCapabilitiesMeasure = async () => {
    device_Array = [];
    let result = await getIOT_Capabilities_Data();
    result.forEach(element => {
   
        for(let i = 0; i < element.properties.length; i++) {
         
        device_Array.push({
            "capability_id"           : element.id,
            "capability_property_name": element.properties[i].name,
            "capability_property_uom": element.properties[i].dataType,
            "capability_property_measure_value": element.properties[i].unitOfMeasure    
                               
        })

    }

    });
    return device_Array;
}

//getIOTSensorsMeasureData
iot.getIOTSensorsMeasureData  = async () => {
    let   device_Array = [];
    let result = await getIOT_Capabilities_Data();
     result.forEach(capability => {
 //console.log(capability.id);
 let option = {
    method: "GET",
    uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/iot/processing/api/v1/tenant/161142174/measures/capabilities/" + capability.id,
    headers: {
            'Authorization': 'Basic ' + BasicToken
        },
    json: true
}

var res =  request_async(option.method, option.uri, {
 headers: {
   'Authorization': 'Basic ' + BasicToken
   },
  });
  
  var body = JSON.parse(res.getBody('utf8'));
//  console.log(res.getBody());
  console.log(body);

//****
for(let i = 0; i < body.length; i++) 
{
    var prop = body[i].measure;
    for(key in prop)
{
  var val =prop[key];

//  console.log(key,val);
  
   device_Array.push({
        "capability_id"           : capability.id,
        "sensor_id": body[i].sensorId,
        "creation_timestamp": body[i].creationTimestamp,
        "sensor_measure_property": key  ,
        "sensor_measure_value" :  val
                           
    });
 }

}

//********* */
    });  //line 95 end
  
  console.log(device_Array);
    return device_Array;
}

iot.getIOTSensorsMeasureData1  = async () => {
    let   device_Array = [];
    let result = await getIOT_Capabilities_Data();
     result.forEach(capability => {
 //console.log(capability.id);
 let option = {
    method: "GET",
    uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/iot/processing/api/v1/tenant/161142174/measures/capabilities/" + capability.id,
    headers: {
            'Authorization': 'Basic ' + BasicToken
        },
    json: true
}
 
var res =  request_sync(option.method, option.uri, {
 headers: {
   'Authorization': 'Basic ' + BasicToken
   },
  });
  
  var body = JSON.parse(res.getBody('utf8'));
//  console.log(res.getBody());
  console.log(body);

//****
for(let i = 0; i < body.length; i++) 
{
    var prop = body[i].measure;
    for(key in prop)
{
  var val =prop[key];

//  console.log(key,val);
  
   device_Array.push({
        "capability_id"           : capability.id,
        "sensor_id": body[i].sensorId,
        "creation_timestamp": body[i].creationTimestamp,
        "sensor_measure_property": key  ,
        "sensor_measure_value" :  val
                           
    });
 }

}

//********* */
    });  //line 95 end
  
  console.log(device_Array);
    return device_Array;
}


iot.getIOTSensorsMeasureData2  = async () => {
    let   device_Array = [];
    let result = await getIOT_Capabilities_Data();
     
    
 //console.log(capability.id);
 let option = { 
    method: "GET",
    uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/iot/processing/api/v1/tenant/161142174/measures/capabilities/5491e991-e8ec-4982-8541-d7849cacc628",
    headers: {
            'Authorization': 'Basic ' + BasicToken
        },
    json: true
}
 
var res =  request_sync(option.method, option.uri, {
 headers: {
   'Authorization': 'Basic ' + BasicToken
   },
  }); 
  
  var body = JSON.parse(res.getBody('utf8'));
//  console.log(res.getBody());
  console.log(body);

//****
for(let i = 0; i < body.length; i++) 
{
    var prop = body[i].measure;
    for(key in prop)
{
  var val =prop[key];

//  console.log(key,val);
  
   device_Array.push({
        "capability_id"           : "5491e991-e8ec-4982-8541-d7849cacc628",
        "sensor_id": body[i].sensorId,
        "creation_timestamp": body[i].creationTimestamp,
        "sensor_measure_property": key  ,
        "sensor_measure_value" :  val
                           
    });
 }

}
  
  console.log(device_Array);
    return device_Array;
}


async function getIOT_Devices_Data() {
    let option = {
        method: "GET",
        uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/9941ae3f-8001-4c30-a61d-35c59674fb19/iot/cockpit/core/tenant/161142174/devices",
        headers: {
                'Authorization': 'Basic ' + BasicToken
            },
        json: true
    }
    return request(option);
}

async function getIOT_Sensors_Data() {
    let option = {
        method: "GET",
        uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/9941ae3f-8001-4c30-a61d-35c59674fb19/iot/core/api/v1/tenant/161142174/sensors?skip=0&top=100",
        headers: {
            'Authorization': 'Basic ' + BasicToken
        },
        json: true
    }
    return request(option);
}
async function getIOT_Capabilities_Data() {
    let option = {
        method: "GET",
        uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/9941ae3f-8001-4c30-a61d-35c59674fb19/iot/core/api/v1/tenant/161142174/capabilities?skip=0&top=100",
        headers: {
            'Authorization': 'Basic ' + BasicToken
        },
        json: true
    }
    return request(option);
}

module.exports = iot