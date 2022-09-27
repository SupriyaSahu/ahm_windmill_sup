var hana = require("@sap/hana-client");

const Hana_DB_Config = {
    serverNode: "508d412a-9528-4d3c-8ce1-f409787bc0b9.hna0.prod-eu10.hanacloud.ondemand.com:443",
    encrypt: "true",
    sslValidateCertificate: "false",
    uid: "2339C6C3629246A8860FB49A2A5C9981_0Y50E7DEX0AFD3UY2QGBIVWEA_RT",
    pwd: "Fz9aASqmHKjXPopq6xXjFg5stwtFBYa27rfDZXh5u3SQR3VsrtYLKuTCXN5ds_Uii8jwi_DPxEVVb-0Q5Bm5MGCUd3MUHaZPKf_XdnZIDvc_YkYhzfxU.7RTl2yrejZL",

}
var dbConnection = hana.createConnection();
 
exports.hana_dbConnection = () => {
    dbConnection.connect(Hana_DB_Config);
    return dbConnection;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  'use strict';
  const { PerformanceObserver, performance } = require('perf_hooks');
  var util = require('util');
  var hana = require('@sap/hana-client');
  
  const Hana_DB_Config = {
    serverNode: "508d412a-9528-4d3c-8ce1-f409787bc0b9.hna0.prod-eu10.hanacloud.ondemand.com:443",
    encrypt: "true",
    sslValidateCertificate: "false",
    uid: "2339C6C3629246A8860FB49A2A5C9981_0Y50E7DEX0AFD3UY2QGBIVWEA_RT",
    pwd: "Fz9aASqmHKjXPopq6xXjFg5stwtFBYa27rfDZXh5u3SQR3VsrtYLKuTCXN5ds_Uii8jwi_DPxEVVb-0Q5Bm5MGCUd3MUHaZPKf_XdnZIDvc_YkYhzfxU.7RTl2yrejZL",

};
  