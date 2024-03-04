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
exports.tableExists = exports.getTableNames = exports.getTableInfo = exports.prepareRecord = exports.ALIAS_TABLE_NAME = exports.ALIAS_COLUMN_DEFAULT = exports.ALIAS_IS_NULLABLE = exports.ALIAS_CHARACTER_MAXIMUM_LENGTH = exports.ALIAS_COLUMN_KEY = exports.ALIAS_DATA_TYPE = exports.ALIAS_COLUMN_NAME = void 0;
var query_1 = require("./query");
exports.ALIAS_COLUMN_NAME = 'COLUMN_NAME';
exports.ALIAS_DATA_TYPE = 'DATA_TYPE';
exports.ALIAS_COLUMN_KEY = 'COLUMN_KEY';
exports.ALIAS_CHARACTER_MAXIMUM_LENGTH = 'CHARACTER_MAXIMUM_LENGTH';
exports.ALIAS_IS_NULLABLE = 'IS_NULLABLE';
exports.ALIAS_COLUMN_DEFAULT = 'COLUMN_DEFAULT';
exports.ALIAS_TABLE_NAME = 'TABLE_NAME';
/**
 * Checks the record against the database schema and removes any irrelevant fields for insertion
 * @param database_name
 * @param table_name
 * @param record_raw
 */
var prepareRecord = function (config) {
    return function (connection, database_name, table_name, record_raw) {
        return __awaiter(this, void 0, void 0, function () {
            var error, allowed_columns, allowed_column_index, user_input_column_names, _i, user_input_column_names_1, column_name, prepared_record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof table_name === 'string')) {
                            error = new Error("MySQLDriver in function prepareRecord: Provided table name is not a string.");
                            error.table_name = table_name;
                            error.record_raw = record_raw;
                            throw error;
                        }
                        return [4 /*yield*/, (0, exports.getTableInfo)(config)(connection, database_name, table_name)];
                    case 1:
                        allowed_columns = _a.sent();
                        allowed_column_index = allowed_columns.reduce(function (state, column) {
                            state[column.COLUMN_NAME] = column;
                            return state;
                        }, {});
                        user_input_column_names = Object.keys(record_raw);
                        for (_i = 0, user_input_column_names_1 = user_input_column_names; _i < user_input_column_names_1.length; _i++) {
                            column_name = user_input_column_names_1[_i];
                            if (!allowed_column_index[column_name]) {
                                throw new Error("MySQLDriver in function prepareRecord: Invalid column: ".concat(column_name, "."));
                            }
                        }
                        prepared_record = {};
                        allowed_columns.map(function (field) {
                            var key = field[exports.ALIAS_COLUMN_NAME];
                            if (key in record_raw && record_raw[key] !== undefined) {
                                //Only add items that have been specified in the record, and are not undefined in value
                                var value = record_raw[key];
                                prepared_record[key] = value;
                            }
                        });
                        return [2 /*return*/, prepared_record];
                }
            });
        });
    };
};
exports.prepareRecord = prepareRecord;
//INTERNAL FUNCTIONS
/**
 * Get the field
 * @param database_name
 * @param table_name
 */
var getTableInfo = function (config) {
    return function (connection, database_name, table_name) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, query_1.query)(config)(connection, "SELECT \n    `COLUMN_NAME` as '".concat(exports.ALIAS_COLUMN_NAME, "', \n    `DATA_TYPE` AS '").concat(exports.ALIAS_DATA_TYPE, "', \n    `COLUMN_KEY` AS '").concat(exports.ALIAS_COLUMN_KEY, "', \n    `CHARACTER_MAXIMUM_LENGTH` as '").concat(exports.ALIAS_CHARACTER_MAXIMUM_LENGTH, "',\n    `IS_NULLABLE` as '").concat(exports.ALIAS_IS_NULLABLE, "',\n    `COLUMN_DEFAULT` as '").concat(exports.ALIAS_COLUMN_DEFAULT, "'\n    FROM INFORMATION_SCHEMA.COLUMNS\n    WHERE `TABLE_NAME` = ? AND `TABLE_SCHEMA` = ?"), [table_name, database_name])];
                    case 1:
                        result = _a.sent();
                        if (result.length === 0) {
                            throw new Error("Table '".concat(table_name, "' does not exist on database '").concat(database_name, "'"));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
};
exports.getTableInfo = getTableInfo;
/**
 * Gets all table names in a given database
 * @param database_name
 */
var getTableNames = function (config) {
    return function (connection, database_name) {
        return __awaiter(this, void 0, void 0, function () {
            var tables, table_names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, query_1.query)(config)(connection, "SELECT TABLE_NAME \n            FROM INFORMATION_SCHEMA.TABLES WHERE `TABLE_SCHEMA` = ?", [database_name])];
                    case 1:
                        tables = _a.sent();
                        table_names = tables.map(function (table) { return table[exports.ALIAS_TABLE_NAME]; });
                        return [2 /*return*/, table_names];
                }
            });
        });
    };
};
exports.getTableNames = getTableNames;
/**
 * Checks if a table exists
 * @param database_name
 * @param table_name
 */
var tableExists = function (config) {
    return function (connection, database_name, table_name) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, query_1.query)(config)(connection, "SELECT TABLE_NAME \n            FROM INFORMATION_SCHEMA.TABLES WHERE `TABLE_SCHEMA` = ? AND `TABLE_NAME` = ?", [database_name, table_name])];
                    case 1:
                        rows = _a.sent();
                        return [2 /*return*/, rows.length > 0];
                }
            });
        });
    };
};
exports.tableExists = tableExists;
//# sourceMappingURL=database.js.map