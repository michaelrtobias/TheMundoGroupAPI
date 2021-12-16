const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

class LeadsTable {
  constructor() {
    this.tableName = "leads";
  }
  async query(params) {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    let queryParams = params;
    queryParams["TableName"] = this.tableName;
    const query = await ddb.query(queryParams).promise();
    const unmarshalledQuery = AWS.DynamoDB.Converter.unmarshall(query);
    return unmarshalledQuery;
  }

  async create(params) {
    const ddb = new AWS.DynamoDB({
      apiVersion: "2012-08-10",
      region: "us-east-1",
    });
    let queryParams = params;
    queryParams["TableName"] = this.tableName;
    const query = await ddb.putItem(queryParams).promise();
    console.log("Lead Created");
    const unmarshalledQuery = AWS.DynamoDB.Converter.unmarshall(query);
    return unmarshalledQuery;
  }
}

module.exports = LeadsTable;
