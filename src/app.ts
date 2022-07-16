/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import express, { Application } from "express";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";
import connect from "./connect";
import Controller from "@/utils/interfaces/controller.interface";
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
    this.express.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
  }

  // Intializes all the middlewares
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

  // Intializes all the constollers and insert /api before the route
  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  // Intializes the Mongo DB
  private initialiseDB(): void {
    const url: string = this.dbUrl;
    connect({ url });
  }

  //Starts listening to the requests
  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Express listening on port ${this.port}`);
    });
  }
}

export default App;
