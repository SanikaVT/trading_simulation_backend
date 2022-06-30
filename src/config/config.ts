require("dotenv").config();

const { PORT, MONGODB_URL } = process.env;

module.exports = { PORT, MONGODB_URL };
