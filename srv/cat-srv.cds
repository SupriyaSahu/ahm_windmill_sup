using {myhanaapp.windmill as windmill} from '../db/table';

service myhana_windmill {
    entity myhana_device as projection on windmill.DEVICE;
    entity myhana_sensor as projection on windmill.SENSORS;
    entity myhana_capabilitiy as projection on windmill.CAPABILITIES;
    entity myhana_capability_measure as projection on windmill.CAPABILITIES_MEASURE;   
    entity myhana_sensors_measure_val as projection on windmill.SENSORS_DATA;   
}