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
const yearly_analytics_model_1 = __importDefault(require("./yearly_analytics.model"));
class AnalyticsService {
    constructor() {
        this.yearlyanalytics = yearly_analytics_model_1.default;
    }
    getAnalytics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filtered_analytics = yield this.yearlyanalytics.find();
                return filtered_analytics;
            }
            catch (err) {
                throw new Error("Unable to get orders.");
            }
        });
    }
}
exports.default = AnalyticsService;
