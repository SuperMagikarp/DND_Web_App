"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
function formatDate(d) {
    return (0, dayjs_1.default)(d).format('YYYY-MM-DD hh:mm:ss');
}
exports.formatDate = formatDate;
//# sourceMappingURL=date.js.map