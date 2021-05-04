const Wishlist = require("./entities/Wishlist");

class TheMundoGroupAPI {
  constructor(event) {
    this.event = event;
    this.body = JSON.parse(this.event.body);
  }
  router() {
    const { resource, httpMethod } = this.event;
    const routes = {
      ...Wishlist.routes,
    };

    if (routes[resource] && routes[resource][httpMethod]) {
      const instanceClass = routes[resource].instance;
      const instance = new instanceClass(this.event);
      const methodName = routes[resource][httpMethod];
      return instance[methodName]();
    } else {
      throw new Error("Unknown route");
    }
  }
  async run() {
    try {
      const result = await this.router();
      let _response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(result),
      };
      return _response;
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify(e.message),
      };
    }
  }
}

module.exports = TheMundoGroupAPI;
