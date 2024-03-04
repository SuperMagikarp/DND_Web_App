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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsSpecialChars = exports.query = exports.ALLOWED_OPERATORS = exports.OPERATORS = void 0;
exports.OPERATORS = {
    AND: 'AND',
    OR: 'OR',
};
exports.ALLOWED_OPERATORS = (_a = {},
    _a[exports.OPERATORS.AND] = 1,
    _a[exports.OPERATORS.OR] = 1,
    _a);
var INVALID_COLUMN_NAME_CHARS = '!#%&’()*+,-./:;<=>?@[]^~ "`\\';
var INVALID_COLUMN_NAME_CHARS_INDEX = INVALID_COLUMN_NAME_CHARS.split('').reduce(function (state, char) {
    state[char] = 1;
    return state;
}, {});
/**
 * Query a connection with data
 * @param connection
 * @param query
 * @param values
 */
var query = function (config) {
    return function (connection, query, values) {
        var _a, _b, _c;
        if (values === void 0) { values = []; }
        return __awaiter(this, void 0, void 0, function () {
            var timeStart, _d, isValid, errors, data, timeEnd, timeTaken, debugInfo;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        timeStart = new Date();
                        _d = checkValues(values), isValid = _d.isValid, errors = _d.errors;
                        if (!isValid) {
                            throw new Error("Query error:\n".concat(query, "\n\nErrors:\n").concat(errors.join('\n')));
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                connection.query(query, values, function (err, resRaw) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        var data_1 = JSON.parse(JSON.stringify(resRaw));
                                        resolve(data_1);
                                    }
                                });
                            })];
                    case 1:
                        data = _e.sent();
                        timeEnd = new Date();
                        timeTaken = (timeEnd.getTime() - timeStart.getTime()) / 1000;
                        debugInfo = {
                            query: query,
                            timeTaken: timeTaken,
                        };
                        if ((_a = config === null || config === void 0 ? void 0 : config.debug) === null || _a === void 0 ? void 0 : _a.enabled) {
                            (_c = (_b = config === null || config === void 0 ? void 0 : config.debug) === null || _b === void 0 ? void 0 : _b.logger) === null || _c === void 0 ? void 0 : _c.call(_b, "Executed query in ".concat(debugInfo.timeTaken, "s"), debugInfo);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
};
exports.query = query;
/**
 * Checks an array of values and ensures that it is not undefined
 * @param values
 */
function checkValues(values) {
    var errors = [];
    for (var idx in values) {
        var value = values[idx];
        if (value === undefined) {
            errors.push("Prepared value at index ".concat(idx, " is undefined"));
        }
    }
    return { isValid: errors.length === 0, errors: errors };
}
function containsSpecialChars(str_val) {
    var found = false;
    for (var i = 0; i < str_val.length; i++) {
        var c = str_val[i];
        if (INVALID_COLUMN_NAME_CHARS_INDEX[c]) {
            found = true;
            break;
        }
    }
    return found;
}
exports.containsSpecialChars = containsSpecialChars;
//# sourceMappingURL=query.js.map