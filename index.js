exports.handler = async (event, context) => {
  console.log(event);
  try {
    //  const result = await this.router();

    let _response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      //body: JSON.stringify(result),
      body: "",
    };
    return _response;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    };
  }
};
