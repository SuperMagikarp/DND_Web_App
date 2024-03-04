"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var chai_1 = __importStar(require("chai"));
var MySQLDriverPackage = __importStar(require("../index"));
var connection_1 = require("./utils/connection");
var TEST_DATA = getTestData();
var config = (0, connection_1.makeTestConnectionConfig)();
describe('All Tests (serverless)', function () {
    var users = {};
    var db = MySQLDriverPackage.connect(__assign(__assign({}, config), { autoClose: {
            intervalMs: 20,
        } }));
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sqls, _i, sqls_1, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqls = [
                        "CREATE TABLE `user` (\n            `user_id` VARCHAR(50) NOT NULL DEFAULT '',\n            `first_name` VARCHAR(255) DEFAULT NULL,\n            `last_name` VARCHAR(255) DEFAULT NULL,\n            `email` VARCHAR(255) DEFAULT NULL,\n            `index_number` INT DEFAULT NULL,\n            `created_by` VARCHAR(50) DEFAULT NULL,\n            `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n            `updated_by` VARCHAR(50) DEFAULT NULL,\n            `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n\n            PRIMARY KEY (`user_id`),\n            INDEX `IX_USE_use_id` (`user_id`),\n            INDEX `IX_USE_fir_nam` (`first_name`),\n            INDEX `IX_USE_las_nam` (`last_name`),\n            INDEX `IX_USE_ema` (`email`),\n            INDEX `IX_USE_ind_num` (`index_number`)\n\n            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
                    ];
                    _i = 0, sqls_1 = sqls;
                    _a.label = 1;
                case 1:
                    if (!(_i < sqls_1.length)) return [3 /*break*/, 4];
                    sql = sqls_1[_i];
                    return [4 /*yield*/, db.query(sql, [])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sqls, _i, sqls_2, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqls = ["DROP TABLE user;"];
                    _i = 0, sqls_2 = sqls;
                    _a.label = 1;
                case 1:
                    if (!(_i < sqls_2.length)) return [3 /*break*/, 4];
                    sql = sqls_2[_i];
                    return [4 /*yield*/, db.query(sql, [])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, db.closeConnection()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Insert records', function () { return __awaiter(void 0, void 0, void 0, function () {
        function createUser(userData) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = __assign({ user_id: db.generateId() }, userData);
                            return [4 /*yield*/, db.insertRecord('user', user)];
                        case 1:
                            _a.sent();
                            users[user.user_id] = user;
                            return [2 /*return*/];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUser(TEST_DATA.USER_1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createUser(TEST_DATA.USER_2)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //Get
    it('Get Records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[0];
                    return [4 /*yield*/, db.getRecords('user', {
                            user_id: user.user_id,
                            index_number: user.index_number,
                        })];
                case 1:
                    record = _a.sent();
                    chai_1.default.assert(record.length > 0, 'Failed to get records.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Limit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getRecords('user', {}, undefined, {
                        limit: { offset: 0, page_size: 1 },
                    })];
                case 1:
                    record = _a.sent();
                    chai_1.default.assert(record.length === 1, 'Failed to limit records.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[1];
                    return [4 /*yield*/, db.getRecords('user', {}, [{ key: 'index_number', order: 'DESC' }], { limit: { offset: 0, page_size: 1 } })];
                case 1:
                    records = _a.sent();
                    chai_1.default.assert(records[0].user_id === user.user_id, 'Failed to order records');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Order Wildcard (before)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user_id_partial, records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[1];
                    user_id_partial = user.user_id.substring(1, user.user_id.length);
                    return [4 /*yield*/, db.getRecords('user', { user_id: user_id_partial }, [{ key: 'index_number', order: 'DESC' }], {
                            limit: { offset: 0, page_size: 1 },
                            where: { wildcardBefore: true },
                        })];
                case 1:
                    records = _a.sent();
                    chai_1.default.assert(records[0] !== undefined, 'Failed to get user record');
                    chai_1.default.assert(records[0].user_id === user.user_id, 'Failed to order records');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Order Wildcard (after)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user_id_partial, records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[1];
                    user_id_partial = user.user_id.substring(0, user.user_id.length - 2);
                    return [4 /*yield*/, db.getRecords('user', { user_id: user_id_partial }, [{ key: 'index_number', order: 'DESC' }], {
                            limit: { offset: 0, page_size: 1 },
                            where: { wildcardAfter: true },
                        })];
                case 1:
                    records = _a.sent();
                    chai_1.default.assert(records[0] !== undefined, 'Failed to get user record');
                    chai_1.default.assert(records[0].user_id === user.user_id, 'Failed to order records');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Order Wildcard (before and after)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user_id_partial, records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[1];
                    user_id_partial = user.user_id.substring(1, user.user_id.length - 2);
                    return [4 /*yield*/, db.getRecords('user', { user_id: user_id_partial }, [{ key: 'index_number', order: 'DESC' }], {
                            limit: { offset: 0, page_size: 1 },
                            where: { wildcard: true },
                        })];
                case 1:
                    records = _a.sent();
                    chai_1.default.assert(records[0] !== undefined, 'Failed to get user record');
                    chai_1.default.assert(records[0].user_id === user.user_id, 'Failed to order records');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records (OR)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user_id_partial, records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[0];
                    user_id_partial = user.user_id.substring(1, user.user_id.length - 2);
                    return [4 /*yield*/, db.getRecords('user', { user_id: user_id_partial, index_number: 2 }, [{ key: 'index_number', order: 'DESC' }], {
                            limit: { offset: 0, page_size: 2 },
                            where: { operator: 'OR', wildcard: true },
                        })];
                case 1:
                    records = _a.sent();
                    chai_1.default.assert(records.length === 2, 'Failed to get records with OR operator.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records (AND)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user_id_partial, records;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[0];
                    user_id_partial = user.user_id.substring(1, user.user_id.length - 2);
                    return [4 /*yield*/, db.getRecords('user', { user_id: user_id_partial, index_number: 2 }, [{ key: 'index_number', order: 'DESC' }], {
                            limit: { offset: 0, page_size: 2 },
                            where: { operator: 'AND', wildcard: true },
                        })];
                case 1:
                    records = _a.sent();
                    chai_1.default.assert(records.length === 0, 'Failed to get records with AND operator.');
                    return [2 /*return*/];
            }
        });
    }); });
    //Count
    it('Get Records Count', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Object.values(users)[0];
                    return [4 /*yield*/, db.getRecordsCount('user', { user_id: user.user_id })];
                case 1:
                    count = _a.sent();
                    chai_1.default.assert(count > 0, 'Failed to count records.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Count Limit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getRecordsCount('user', {}, undefined, {
                        limit: { offset: 0, page_size: 1 },
                    })];
                case 1:
                    count = _a.sent();
                    chai_1.default.assert(count === 1, 'Failed to limit records.');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get Records Count Order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getRecordsCount('user', {}, [{ key: 'index_number', order: 'DESC' }], { limit: { offset: 0, page_size: 1 } })];
                case 1:
                    count = _a.sent();
                    chai_1.default.assert(count === 1, 'Failed to limit records.');
                    return [2 /*return*/];
            }
        });
    }); });
    //Update
    it('Update Records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1, user1_updated, user2, user2_record, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = Object.values(users)[0];
                    return [4 /*yield*/, db.updateRecords('user', TEST_DATA.USER_1_UPDATED, {
                            user_id: user1.user_id,
                        })];
                case 1:
                    _a.sent();
                    user1 = __assign(__assign({}, user1), TEST_DATA.USER_1_UPDATED);
                    users[user1.user_id] = user1;
                    return [4 /*yield*/, db.getRecord('user', { user_id: user1.user_id })];
                case 2:
                    user1_updated = _a.sent();
                    chai_1.default.assert.equal(user1_updated.first_name, TEST_DATA.USER_1_UPDATED.first_name, 'Failed to up update record.');
                    user2 = Object.values(users)[1];
                    return [4 /*yield*/, db.getRecord('user', { user_id: user2.user_id })];
                case 3:
                    user2_record = _a.sent();
                    for (key in user2) {
                        chai_1.default.assert.strictEqual(user2[key], user2_record[key], 'Unexpected record update.');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    //Delete
    it('Delete Records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1, found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = Object.values(users)[0];
                    return [4 /*yield*/, db.deleteRecords('user', { user_id: user1.user_id })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getRecords('user', { user_id: user1.user_id })];
                case 2:
                    found = _a.sent();
                    chai_1.assert.equal(found.length, 0, 'Failed to delete users');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Automatic reconnect', function () {
    var users = {};
    var db = MySQLDriverPackage.connect(config);
    var testData = getTestData();
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sqls, _i, sqls_3, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqls = [
                        "CREATE TABLE `user` (\n            `user_id` VARCHAR(50) NOT NULL DEFAULT '',\n            `first_name` VARCHAR(255) DEFAULT NULL,\n            `last_name` VARCHAR(255) DEFAULT NULL,\n            `email` VARCHAR(255) DEFAULT NULL,\n            `index_number` INT DEFAULT NULL,\n            `created_by` VARCHAR(50) DEFAULT NULL,\n            `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n            `updated_by` VARCHAR(50) DEFAULT NULL,\n            `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n\n            PRIMARY KEY (`user_id`),\n            INDEX `IX_USE_use_id` (`user_id`),\n            INDEX `IX_USE_fir_nam` (`first_name`),\n            INDEX `IX_USE_las_nam` (`last_name`),\n            INDEX `IX_USE_ema` (`email`),\n            INDEX `IX_USE_ind_num` (`index_number`)\n\n            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
                    ];
                    _i = 0, sqls_3 = sqls;
                    _a.label = 1;
                case 1:
                    if (!(_i < sqls_3.length)) return [3 /*break*/, 4];
                    sql = sqls_3[_i];
                    return [4 /*yield*/, db.query(sql, [])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, db.insertRecord('user', testData.USER_1)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sqls, _i, sqls_4, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqls = ["DROP TABLE user;"];
                    _i = 0, sqls_4 = sqls;
                    _a.label = 1;
                case 1:
                    if (!(_i < sqls_4.length)) return [3 /*break*/, 4];
                    sql = sqls_4[_i];
                    return [4 /*yield*/, db.query(sql, [])];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, db.closeConnection()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Can query after disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
        var d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db.closeConnection();
                    return [4 /*yield*/, db.getRecords('user', { email: testData.USER_1.email })];
                case 1:
                    d = _a.sent();
                    (0, chai_1.assert)(d[0].email === testData.USER_1.email, 'Failed to get correct data');
                    (0, chai_1.assert)(d.length > 0, 'Failed to get records');
                    return [2 /*return*/];
            }
        });
    }); });
});
function getTestData() {
    return {
        USER_1: {
            first_name: 'test_user1',
            last_name: 'tu1ln',
            email: 'test_user1@localhost',
            index_number: 1,
        },
        USER_1_UPDATED: {
            first_name: 'test_user1_updated',
        },
        USER_2: {
            first_name: 'test_user2',
            last_name: 'tu2ln',
            email: 'test_user2@localhost',
            index_number: 2,
        },
    };
}
//# sourceMappingURL=serverless-mysql.spec.js.map