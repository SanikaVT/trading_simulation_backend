"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorMiddleware(error, req, res) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong.";
    console.log(error.message);
    res.status(status).send({ status, message });
}
exports.default = ErrorMiddleware;
