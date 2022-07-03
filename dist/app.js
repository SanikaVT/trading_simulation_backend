"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const connect_1 = __importDefault(require("./connect"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const helmet_1 = __importDefault(require("helmet"));
const cors = require("cors");
dotenv_1.default.config();
class App {
    constructor(controllers, port, dbUrl) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.dbUrl = dbUrl;
        this.initialiseDB();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    initialiseMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use(cors());
        this.express.use((0, morgan_1.default)("dev"));
        // parse application/json
        this.express.use(express_1.default.json());
        // parse application/x-www-form-urlencoded
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use("/api", controller.router);
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialiseDB() {
        const url = this.dbUrl;
        (0, connect_1.default)({ url });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Express listening on port ${this.port}`);
        });
    }
}
exports.default = App;
