const LeadsTable = require("../../db/LeadsTable");

class Wishlist {
  static routes = {
    "/wishlist": {
      instance: this,
      GET: "getAllLeads",
      POST: "createLead",
    },
    "/wishlist/images": {
      instance: this,
      POST: "uploadImage",
    },
  };

  constructor(event) {
    this.event = event;
    this.body = JSON.parse(this.event.body);
    this.leads = new LeadsTable();
  }

  async getAllLeads() {
    console.log("getAllLeads was run");
    return 1;
  }

  getCurrentDate() {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    const today = mm + "-" + dd + "-" + yyyy;
    return today;
  }

  async createLead() {
    const body = this.body;

    let params = {
      Item: {
        first_name: {
          S: body.first_name,
        },

        last_name: {
          S: body.last_name,
        },
        phone: {
          S: body.phone,
        },
        email: {
          S: body.email,
        },
        type: {
          S: body.type,
        },
        make: {
          S: body.make,
        },
        model: {
          S: body.model,
        },
        description: {
          S: body.description,
        },
        image_URL: {
          S: body.image_URL,
        },
        created_date: {
          S: this.getCurrentDate(),
        },
        timestamp: {
          S: new Date().toISOString(),
        },
      },
    };
    const result = await this.leads.create(params);
    return result;
  }
  async uploadImage() {
    console.log("uploadImage was run");
    return 3;
  }
}
module.exports = Wishlist;
