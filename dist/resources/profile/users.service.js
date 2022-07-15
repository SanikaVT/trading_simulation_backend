"use strict";
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
const users_model_1 = __importDefault(require("./users.model"));
//Author: Sanika Tamhankar B00909848
class ProfileService {
    constructor() {
        this.users = users_model_1.default;
    }
    updateProfile(users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prof = yield this.users.findOneAndUpdate({ userID: users.userID }, {
                    address: users.address,
                    credits: users.credits,
                    account: users.account,
                    risk_appetite: users.risk_appetite,
                });
                return prof;
            }
            catch (err) {
                throw new Error("Unable to update profile.");
            }
        });
    }
    getProfileById(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getProfile = yield this.users.findOne({ userID: userID });
                console.log("Success");
                return getProfile;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to get profile.");
            }
        });
    }
    /**
     * Author: Udit Gandhi
     */
    updateUserCredits(userID, credits) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.users.findOneAndUpdate({ userID: userID }, {
                    credits: credits,
                });
                return user;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to update user credits.");
            }
        });
    }
    /**
     * Author: Udit Gandhi
     */
    getUserCredits(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.users.findOne({ userID: userID });
                return user === null || user === void 0 ? void 0 : user.credits;
            }
            catch (err) {
                console.log(err.message);
                throw new Error("Unable to update user credits.");
            }
        });
    }
}
exports.default = ProfileService;
