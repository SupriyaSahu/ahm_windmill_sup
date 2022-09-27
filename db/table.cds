namespace myhanaapp;

context windmill {

    entity DEVICE {
        key id                : String(64);
        alternateId       : String(64);
        name              : String(64);
        gatewayId         : Integer;
        creationTimestamp : Timestamp;
        online            : Boolean
    }

    entity SENSORS {
        key id          : String(64);
            alternateId : String(64);
            sensor_name : String(64)
    }

    entity CAPABILITIES {
        key id              : String(64);
            alternateId     : String(64);
            capability_name : String(64)

    }

    entity CAPABILITIES_MEASURE{
        key capability_id                     : String(64);
        key capability_property_name          : String(64);
            capability_property_uom           : String(64);
            capability_property_measure_value : String(64)
        }
    
     entity SENSORS_DATA {
        key capability_id                : String(64);
        key sensor_id				     : String(64);
        key creation_timestamp           : String(64);
            sensor_measure_property      : String(362);
			sensor_measure_value : Decimal(15, 2)
        }
}
