require("dotenv").config();

const { NODE_ENV, PORT, MONGODB_URL } = process.env;

module.exports = { NODE_ENV, PORT, MONGODB_URL };
