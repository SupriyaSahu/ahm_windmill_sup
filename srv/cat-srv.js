const cds = require('@sap/cds');
const {getIOTDevices} = require('./read_iot_api')
const {getIOTSensors} = require('./read_iot_api') 
const {getIOTCapabilities} = require('./read_iot_api') 
const {getIOTCapabilitiesMeasure} = require('./read_iot_api') 
const {getIOTSensorsMeasureData1} = require('./read_iot_api') 
const db = require('./dbQuery')
/**
 * Implementation for service defined in ./cat-srv.cds
 */

 //Step 1:- reading APIs data and writing it into our HDI Container
 const getDevice = async(req,res,next) => {
    try{
        let result = await getIOTDevices()
   //     return result;
       console.log(result)
   ///
   result.forEach(async (element) => {
       
    db.execute_query(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_DEVICE" VALUES ( 
        '${element.id}' ,
        '${element.alternateId}' ,
        '${element.name}' ,       
         ${element.gatewayId},
        '${element.creationTimestamp}' ,
         ${element.online}
        )  WITH PRIMARY KEY ;`);

        console.log(result);
    
})
   ///
    }
    catch(err){
        console.log(err)
    }

 };

 //Step 3
 const getSensor = async(req,res,next) => {
    try{
        let result = await getIOTSensors()
   //     return result;
       console.log(result)
   ///
   result.forEach(async (element) => {
       
    db.execute_query(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_SENSORS" VALUES ( 
        '${element.id}' ,
        '${element.alternateId}' ,
        '${element.name}' 
        )  WITH PRIMARY KEY ;`);

        console.log(result);
    
})
   ///
    }
    catch(err){
        console.log(err)
    }

 };


 //Step 4:-
 const getCapabilities = async(req,res,next) => {
    try{
        let result = await getIOTCapabilities()
   //     return result;
       console.log(result)
   ///
   result.forEach(async (element) => {
       
    db.execute_query(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_CAPABILITIES" VALUES ( 
        '${element.id}' ,
        '${element.alternateId}' ,
        '${element.name}' 
        )  WITH PRIMARY KEY ;`);

        console.log(result);
    
})
   ///
    }
    catch(err){
        console.log(err)
    }

 };


 //Step 5:
 const getCapabilitiesMeasure = async(req,res,next) => {
    try{
        let result = await getIOTCapabilitiesMeasure()
   //     return result;
       console.log(result)
   ///
   result.forEach(async (element) => {
       
    db.execute_query(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_CAPABILITIES_MEASURE" VALUES ( 
        '${element.capability_id}' ,
        '${element.capability_property_name}' ,
        '${element.capability_property_uom}' ,
        '${element.capability_property_measure_value}' 
        )  WITH PRIMARY KEY ;`);

        console.log(result);
    
})
   ///
    }
    catch(err){
        console.log(err)
    }

 };

 //Step 6:
 const getIOTSensorsMeasure = async(req,res,next) => {
    try{
        let result = await getIOTSensorsMeasureData1()
   //     return result;
    //   console.log(result);
   ///
   result.forEach(async (element) => {
   /**    console.log(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_SENSORS_DATA" VALUES ( 
        '${element.capability_id}' ,
        '${element.sensor_id}' ,
        '${element.creation_timestamp}' ,
        '${element.sensor_measure_property}' ,
        '${element.sensor_measure_value}' 

        )  WITH PRIMARY KEY ;`
        );
 */

    db.execute_query(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_SENSORS_DATA" VALUES ( 
        '${element.capability_id}' ,
        '${element.sensor_id}' ,
        '${element.creation_timestamp}' ,
        '${element.sensor_measure_property}' ,
        '${element.sensor_measure_value}' 

        )  WITH PRIMARY KEY ;`);
    
   

  //      console.log(result);
     
})
db.stop_db_Connection();
console.log("Success 42")
return{"Success":"OK"}; 
   ///
    }
    catch(err){
        console.log(err)
    }

 };

 //Step 2:- we will write APIs data into DB. For write we will create  2 files - dBConnection and Query file.
const writeDevice  =  async(req,res,next) => {
    try{
        let result = getDevice();
        console.log(result);
        result.forEach(async (element) => {
            try{
               
            db.execute_query(`UPSERT "2339C6C3629246A8860FB49A2A5C9981"."MYHANAAPP_WINDMILL_DEVICE" VALUES ( 
                '${element.id}' ,
                '${element.alternateId}' ,
                '${element.name}' ,       
                 ${element.gatewayId},
                '${element.creationTimestamp}' ,
                  ${element.online}
                )  WITH PRIMARY KEY ;`);

                console.log(result);
            }
            catch(err){

            }
        })
    }
    catch(err){

    }
}


module.exports = cds.service.impl(function () {
    this.after('READ', 'myhana_device', each => {

        console.log("everyting after")
    });

    //step 1
    this.before('READ', 'myhana_device', each => {
       getDevice();
    });

    this.before('READ', 'myhana_sensor', each => {
        getSensor();
     });

     this.before('READ', 'myhana_capabilitiy', each => {
        getCapabilities();
     });

     this.before('READ', 'myhana_capability_measure', each => {
        getCapabilitiesMeasure();
     });
     this.before('READ', 'myhana_sensors_measure_val', each => {
        getIOTSensorsMeasure();
     });

});