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
const profile_model_1 = __importDefault(require("../profile/profile.model"));
class ProfileService {
    constructor() {
        this.profile = profile_model_1.default;
    }
    updateProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prof = yield this.profile.findByIdAndUpdate(profile.userID, profile);
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
                const getProfile = yield this.profile.findById(userID);
                return getProfile;
            }
            catch (err) {
                throw new Error("Unable to get profile.");
            }
        });
    }
}
exports.default = ProfileService;
