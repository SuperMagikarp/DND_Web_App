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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSelectStatement = exports.selectRecordRawCount = exports.selectRecordRaw = void 0;
var query_1 = require("./query");
var selectRecordRaw = function (config) {
    return function (connection, table_name, where, order_by, options) {
        if (where === void 0) { where = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, params, isResultEmpty, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = prepareSelectStatement(table_name, where, order_by, options), sql = _a.sql, params = _a.params, isResultEmpty = _a.isResultEmpty;
                        if (isResultEmpty) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, (0, query_1.query)(config)(connection, sql, params)];
                    case 1:
                        data = _b.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
};
exports.selectRecordRaw = selectRecordRaw;
/**
 * INTERNAL: Select count of records from a given table without any data processing
 * @param table_name
 * @param where
 */
var selectRecordRawCount = function (config) {
    return function (connection, table_name, where, order_by, options) {
        if (where === void 0) { where = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var funcName, _a, sql, params, isResultEmpty, sql_count, records;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        funcName = 'selectRecordRawCount';
                        _a = prepareSelectStatement(table_name, where, order_by, options), sql = _a.sql, params = _a.params, isResultEmpty = _a.isResultEmpty;
                        if (isResultEmpty) {
                            return [2 /*return*/, 0];
                        }
                        sql_count = "SELECT COUNT(*) AS count from (\n    ".concat(sql, ") AS T");
                        return [4 /*yield*/, (0, query_1.query)(config)(connection, sql_count, params)];
                    case 1:
                        records = _b.sent();
                        return [2 /*return*/, records[0].count];
                }
            });
        });
    };
};
exports.selectRecordRawCount = selectRecordRawCount;
/**
 * INTERNAL: Prepare select statement from options
 * @param table_name
 * @param where
 */
function prepareSelectStatement(table_name, where, order_by, options) {
    if (where === void 0) { where = {}; }
    var funcName = '_prepareSelectStatement';
    var select_sql = "SELECT * FROM `".concat(table_name, "`");
    var isResultEmpty = false;
    var params = [];
    //Validations
    var where_options = options === null || options === void 0 ? void 0 : options.where;
    var where_operator = (where_options === null || where_options === void 0 ? void 0 : where_options.operator) || 'AND';
    if (where_operator) {
        if (!query_1.ALLOWED_OPERATORS[where_operator]) {
            throw new Error("".concat(funcName, ": Invalid operator '").concat(where_operator, "'"));
        }
    }
    //Construction
    var where_clause = Object.keys(where ? where : {})
        .map(function (key) {
        if ((0, query_1.containsSpecialChars)(key)) {
            throw new Error("".concat(funcName, ": Special character found in key: '").concat(key, "'"));
        }
        var value = where[key];
        if ((where_options === null || where_options === void 0 ? void 0 : where_options.wildcard) ||
            ((where_options === null || where_options === void 0 ? void 0 : where_options.wildcardAfter) && where_options.wildcardAfter)) {
            if (Array.isArray(value)) {
                throw new Error("".concat(funcName, ": Wildcard search not supported for arrays."));
            }
            params.push("%".concat(value, "%"));
            return "".concat(key, " LIKE ?");
        }
        else if (where_options === null || where_options === void 0 ? void 0 : where_options.wildcardBefore) {
            if (Array.isArray(value)) {
                throw new Error("".concat(funcName, ": Wildcard search not supported for arrays."));
            }
            params.push("%".concat(value));
            return "".concat(key, " LIKE ?");
        }
        else if (where_options === null || where_options === void 0 ? void 0 : where_options.wildcardAfter) {
            if (Array.isArray(value)) {
                throw new Error("".concat(funcName, ": Wildcard search not supported for arrays."));
            }
            params.push("".concat(value, "%"));
            return "".concat(key, " LIKE ?");
        }
        else {
            params.push(value);
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    isResultEmpty = true;
                }
                return "`".concat(key, "` IN (?)");
            }
            else {
                return "`".concat(key, "` = ?");
            }
        }
    })
        .reduce(function (state, cur, idx) {
        if (idx === 0) {
            state = "WHERE ".concat(cur);
        }
        else {
            state += " ".concat(where_operator, " ").concat(cur);
        }
        return state;
    }, '');
    //Compute order by caluse
    var order_by_clause = (order_by ? order_by : [])
        .map(function (rule) {
        var _a = rule || {}, _b = _a.key, key = _b === void 0 ? '' : _b, _c = _a.order, order = _c === void 0 ? '' : _c;
        if ((0, query_1.containsSpecialChars)(key)) {
            throw new Error("".concat(funcName, ": Special character found in key: '").concat(key, "'"));
        }
        if (!key || !order || !(typeof order === 'string')) {
            throw new Error("".concat(funcName, ": Invalid order by config provided [").concat(key, " : ").concat(order, "]"));
        }
        var property_name = key;
        var sort_order = order.trim().toUpperCase();
        //Check that sort_order is either ASC or DESC
        if (['ASC', 'DESC'].indexOf(sort_order) === -1) {
            throw new Error("".concat(funcName, ": Invalid sort order provided - '").concat(sort_order));
        }
        return "`".concat(property_name, "` ").concat(sort_order);
    })
        .reduce(function (state, cur, idx) {
        if (idx === 0) {
            state += "ORDER BY ".concat(cur);
        }
        else {
            state += ",\n".concat(cur);
        }
        return state;
    }, '');
    //Compute limit clause
    var _a = (options || {}).limit, limit = _a === void 0 ? undefined : _a;
    var limit_clause = '';
    if (limit) {
        var offset = limit.offset, page_size = limit.page_size;
        if (offset == undefined) {
            offset = 0;
        }
        if (typeof offset !== 'number') {
            throw new Error("".concat(funcName, ": offset in limit option must be a number."));
        }
        if (typeof page_size !== 'number') {
            throw new Error("".concat(funcName, ": page_size in limit option must be a number."));
        }
        limit_clause += " LIMIT ?, ?";
        params.push(offset);
        params.push(page_size);
    }
    var sql = "".concat(select_sql, " ").concat(where_clause, " ").concat(order_by_clause, " ").concat(limit_clause);
    return {
        sql: sql,
        params: params,
        isResultEmpty: isResultEmpty,
    };
}
exports.prepareSelectStatement = prepareSelectStatement;
//# sourceMappingURL=select.js.map