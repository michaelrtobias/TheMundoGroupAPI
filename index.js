const Handler = require("./src/TheMundoGroupAPI");

exports.handler = async (event, context) => {
  console.log(event);
  const handler = new Handler(event);
  const result = await handler.run();
  return result;
};
