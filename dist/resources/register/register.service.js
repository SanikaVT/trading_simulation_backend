"use strict";
/**
 * Author: Dharmay Dineshchandra Sureja
 * BannerID: B00904061
 * Email: dh276903@dal.ca
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// register services responsible to handle businesslogic
const register_model_1 = __importDefault(require("../register/register.model"));
class RegisterService {
    constructor() {
        this.register = register_model_1.default;
    }
    create(register) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdRegisters = yield this.register.create(register);
                return createdRegisters;
            }
            catch (err) {
                throw new Error("Unable to Register User.");
            }
        });
    }
    getRegisters(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registers = yield this.register.findOne({ email: email });
                return registers;
            }
            catch (err) {
                throw new Error("Unable to get register.");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registers = yield this.register.findOne({
                    email: email,
                    password: password,
                });
                return registers;
            }
            catch (err) {
                throw new Error("Unable to get register.");
            }
        });
    }
    resetpassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prof = yield this.register.findOneAndUpdate({ email: email }, { password: password });
                return prof;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to update profile.");
            }
        });
    }
}
exports.default = RegisterService;
