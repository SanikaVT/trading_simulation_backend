"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Udit Gandhi
 */
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = ({ url }) => {
    const connect = () => {
        mongoose_1.default
            .connect(url)
            .then(() => {
            return console.info(`Successfully connected to Mongo DB.`);
        })
            .catch((error) => {
            console.error("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on("disconnected", connect);
};
