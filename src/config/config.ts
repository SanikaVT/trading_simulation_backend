/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
require("dotenv").config();

const { NODE_ENV, PORT, MONGODB_URL } = process.env;

module.exports = { NODE_ENV, PORT, MONGODB_URL };
