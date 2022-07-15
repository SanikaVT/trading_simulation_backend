/**
 * Author: Udit Gandhi
 */
import express, { Application } from "express";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";
import connect from "./connect";
import Controller from "@/utils/interfaces/controller.interface";
//import ErrorMiddleware from "./middleware/error.middleware";
import helmet from "helmet";
import path from "path";
const cors = require("cors");
dotenv.config();

class App {
  public express: Application;
  public port: number;
  public dbUrl: string;
  constructor(controllers: Controller[], port: number, dbUrl: string) {
    this.express = express();
    this.port = port;
    this.dbUrl = dbUrl;
    this.initialiseDB();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
    this.express.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    // parse application/json
    this.express.use(express.json());
    // parse application/x-www-form-urlencoded
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(express.static(path.join(__dirname, "../build")));
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    //this.express.use(ErrorMiddleware);
  }

  private initialiseDB(): void {
    const url: string = this.dbUrl;
    connect({ url });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Express listening on port ${this.port}`);
    });
  }
}

export default App;
