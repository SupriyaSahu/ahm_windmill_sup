const hana_Connection = require("./dbConnection")

exports.execute_query = function (query) {
    const dbConnection = hana_Connection.hana_dbConnection()
    console.log("Query is = " + query)
    const result = dbConnection.exec(query);
    dbConnection.disconnect();
    return result;
}

 ///////////////////////////////////

 