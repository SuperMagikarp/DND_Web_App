"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQueryBuilder = void 0;
var knex_1 = __importDefault(require("knex"));
function makeQueryBuilder() {
    var builder = (0, knex_1.default)({
        client: 'mysql',
    });
    return Object.freeze(builder);
}
exports.makeQueryBuilder = makeQueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map