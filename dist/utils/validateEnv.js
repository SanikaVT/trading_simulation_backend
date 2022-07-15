"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Udit Gandhi
 */
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({
            choices: ["development", "production"],
        }),
        MONGODB_URL: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 3000 }),
    });
}
exports.default = validateEnv;
