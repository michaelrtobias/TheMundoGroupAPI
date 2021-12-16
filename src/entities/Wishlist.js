const LeadsTable = require("../../db/LeadsTable");
const AWS = require("aws-sdk");
const dotenv = require("dotenv").config();

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
    console.log(result);
    console.log("params", params);
    return result;
  }

  async uploadImage() {
    try {
      const S3_Bucket = process.env.BUCKET;
      const body = this.body;
      const s3 = new AWS.S3();
      const fileName = body.fileName;
      const fileType = body.fileType;
      const s3Params = {
        Bucket: S3_Bucket,
        Key: fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: "public-read",
      };

      const imageURL = await s3.getSignedUrl("putObject", s3Params);
      const result = {
        signedRequest: imageURL,
        url: `https://${S3_Bucket}.s3.amazonaws.com/${fileName}`,
      };
      console.log(result);
      return result;
    } catch (e) {
      console.log(e.message);
      return {
        statusCode: 500,
        body: JSON.stringify(e.message),
      };
    }
  }
}
module.exports = Wishlist;
