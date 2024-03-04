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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultMigrationProcessor = exports.MigrationController = void 0;
var migrateUpgrade_1 = __importDefault(require("../../usecases/migrateUpgrade"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var mkdirp_1 = __importDefault(require("mkdirp"));
var MigrationAction_1 = require("../../interfaces/MigrationAction");
var MigrationController = /** @class */ (function () {
    function MigrationController(db, processor) {
        this.processor = processor;
        this.db = db;
    }
    MigrationController.prototype.upgrade = function (folderName, count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, migrateUpgrade_1.default)(this.db, this.processor, MigrationAction_1.MigrationAction.Up, count, path_1.default.resolve(path_1.default.join(process.cwd(), folderName)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MigrationController.prototype.rollback = function (folderName, count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, migrateUpgrade_1.default)(this.db, this.processor, MigrationAction_1.MigrationAction.Down, count, path_1.default.resolve(path_1.default.join(process.cwd(), folderName)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a set of migrations, with corresponding up and down actions
     * @param folderName
     * @param scriptName
     */
    MigrationController.prototype.createMigration = function (folderName, scriptName) {
        return __awaiter(this, void 0, void 0, function () {
            var folderPath, exists, timestamp, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        folderPath = path_1.default.resolve(path_1.default.join(process.cwd(), folderName));
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                fs_1.default.exists(folderPath, function (exists) {
                                    resolve(exists);
                                });
                            })];
                    case 1:
                        exists = _a.sent();
                        if (!!exists) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, mkdirp_1.default)(folderPath)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        timestamp = new Date().getTime();
                        name = "".concat(timestamp, "-").concat(scriptName);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                fs_1.default.writeFile(path_1.default.join(folderPath, "".concat(name, ".up.sql")), '', function (err) {
                                    err ? reject(err) : resolve();
                                });
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                fs_1.default.writeFile(path_1.default.join(folderPath, "".concat(name, ".down.sql")), '', function (err) {
                                    err ? reject(err) : resolve();
                                });
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MigrationController;
}());
exports.MigrationController = MigrationController;
var createDefaultMigrationProcessor = function (db) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.tableExists('migrations')];
            case 1:
                if (!!(_a.sent())) return [3 /*break*/, 3];
                return [4 /*yield*/, db.query("CREATE TABLE `migrations` (\n      `id` int(11) NOT NULL AUTO_INCREMENT,\n      `name` varchar(255) NOT NULL,\n      `run_on` datetime NOT NULL,\n      PRIMARY KEY (`id`)\n    ) ENGINE=InnoDB")];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, {
                    sql: {
                        handler: function (migrationFile) { return __awaiter(void 0, void 0, void 0, function () {
                            var query, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                fs_1.default.readFile(migrationFile.filePath, function (err, data) {
                                                    err ? reject(err) : resolve(data.toString());
                                                });
                                            })];
                                    case 1:
                                        query = _a.sent();
                                        return [4 /*yield*/, db.query(query)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, {
                                                success: true,
                                            }];
                                    case 3:
                                        err_1 = _a.sent();
                                        console.error(err_1);
                                        return [2 /*return*/, {
                                                success: false,
                                            }];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    js: {
                        handler: function (migrationFile) { return __awaiter(void 0, void 0, void 0, function () {
                            var migrate, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        migrate = require(migrationFile.filePath);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, migrate(db)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, { success: true }];
                                    case 3:
                                        err_2 = _a.sent();
                                        console.error(err_2);
                                        return [2 /*return*/, { success: false }];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                }];
        }
    });
}); };
exports.createDefaultMigrationProcessor = createDefaultMigrationProcessor;
//# sourceMappingURL=migration.js.map