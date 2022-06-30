import express, { Express } from "express";
import dotenv from "dotenv";
import connect from "./connect";
const router = require("./routes/routes");
const cors = require("cors");
const { PORT, MONGODB_URL } = require("./config/config");
dotenv.config();

const app: Express = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(router);

const url: string = MONGODB_URL;
connect({ url });

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
module.exports = app;
