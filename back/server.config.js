const dotenv = require("dotenv").config("back/.env");

module.exports = {
  uri: process.env.MONGODB_URI,

};