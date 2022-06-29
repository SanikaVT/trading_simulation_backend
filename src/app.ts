import express, { Express } from "express";
import dotenv from "dotenv";
const router = require("./routes/routes");

dotenv.config();

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
module.exports = app;
