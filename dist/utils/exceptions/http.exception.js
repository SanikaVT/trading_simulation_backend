"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Error type specific to http exception.
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpException;
