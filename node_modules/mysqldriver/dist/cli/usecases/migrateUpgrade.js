"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.parseFilepath = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var MigrationFileExtensions_1 = require("../interfaces/MigrationFileExtensions");
var MigrationFileTypes_1 = require("../interfaces/MigrationFileTypes");
var MigrationAction_1 = require("../interfaces/MigrationAction");
function default_1(db, processor, action, count, migrationPath) {
    return __awaiter(this, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        fs_1.default.lstat(migrationPath, function (err, stat) {
                            err ? reject(err) : resolve(stat);
                        });
                    })];
                case 1:
                    info = _a.sent();
                    if (!info.isDirectory()) return [3 /*break*/, 3];
                    return [4 /*yield*/, migrate(db, processor, action, count, migrationPath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: throw new NotDirectoryException(migrationPath);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
/**
 * Perform migrations for path
 * @param migrationPath
 */
function migrate(db, processor, action, count, migrationPath) {
    return __awaiter(this, void 0, void 0, function () {
        var appliedMigrations, appliedMigrationIndex, files, migrationsRaw, migrations, _i, migrationsRaw_1, migrationRaw, i, migration, ext, config, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db.getRecords('migrations', {})];
                case 1:
                    appliedMigrations = _b.sent();
                    appliedMigrationIndex = appliedMigrations.reduce(function (state, migration) {
                        state[migration.name] = migration;
                        return state;
                    }, {});
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            fs_1.default.readdir(migrationPath, { encoding: 'utf-8' }, function (err, paths) {
                                err ? reject(err) : resolve(paths);
                            });
                        })];
                case 2:
                    files = _b.sent();
                    migrationsRaw = files.map(function (fileName) {
                        return parseFilepath(path_1.default.resolve(path_1.default.join(migrationPath, fileName)));
                    });
                    migrations = [];
                    for (_i = 0, migrationsRaw_1 = migrationsRaw; _i < migrationsRaw_1.length; _i++) {
                        migrationRaw = migrationsRaw_1[_i];
                        if (migrationRaw !== null) {
                            migrations.push(migrationRaw);
                        }
                    }
                    //Filter by correct action types
                    migrations = migrations.filter(function (m) { return m.action === action; });
                    //Check to ensure that no duplicate migrations are created
                    migrations.reduce(function (state, migration) {
                        if (state[migration.name]) {
                            var existingMigration = state[migration.name];
                            throw new DuplicateMigrationNameError(existingMigration);
                        }
                        state[migration.name] = migration;
                        return state;
                    }, {});
                    //Filter out based on action type
                    switch (action) {
                        case MigrationAction_1.MigrationAction.Up: {
                            migrations = migrations.filter(function (migration) {
                                if (appliedMigrationIndex[migration.name]) {
                                    //if we have applied this migration before, skip
                                    return false;
                                }
                                return true;
                            });
                            break;
                        }
                        case MigrationAction_1.MigrationAction.Down: {
                            migrations = migrations.filter(function (migration) {
                                if (!appliedMigrationIndex[migration.name]) {
                                    //if we have not applied this migration before, skip
                                    return false;
                                }
                                return true;
                            });
                            break;
                        }
                    }
                    //Sort migrations sequence to be applied
                    switch (action) {
                        case MigrationAction_1.MigrationAction.Up: {
                            //Sort migrations by created date ASC for upgrades
                            migrations = migrations.sort(function (a, b) {
                                if (a.fileName < b.fileName) {
                                    return -1;
                                }
                                else if (a.fileName > b.fileName) {
                                    return 1;
                                }
                                else {
                                    return 0;
                                }
                            });
                            break;
                        }
                        case MigrationAction_1.MigrationAction.Down: {
                            //Sort migrations by created date DESC for upgrades
                            migrations = migrations.sort(function (a, b) {
                                if (a.fileName < b.fileName) {
                                    return 1;
                                }
                                else if (a.fileName > b.fileName) {
                                    return -1;
                                }
                                else {
                                    return 0;
                                }
                            });
                            break;
                        }
                    }
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < count)) return [3 /*break*/, 12];
                    if (i >= migrations.length) {
                        return [3 /*break*/, 12];
                    }
                    migration = migrations[i];
                    ext = migration.ext;
                    config = processor[ext];
                    if (!!config) return [3 /*break*/, 4];
                    throw new UnsupportedFileExtensionProcessorException(ext);
                case 4: return [4 /*yield*/, config.handler(migration)];
                case 5:
                    result = _b.sent();
                    if (!!result.success) return [3 /*break*/, 6];
                    console.log("[\u2A2F] Failed to apply migration ".concat(migration.name, " with action ").concat(migration.action));
                    throw new MigrationFailedError(migration);
                case 6:
                    _a = migration.action;
                    switch (_a) {
                        case MigrationAction_1.MigrationAction.Up: return [3 /*break*/, 7];
                        case MigrationAction_1.MigrationAction.Down: return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 7: return [4 /*yield*/, db.insertRecord('migrations', {
                        name: migration.name,
                        run_on: new Date(),
                    })];
                case 8:
                    _b.sent();
                    console.log("[\u2714\uFE0F] Applied migration ".concat(migration.name, " (").concat(migration.ext, ") with action ").concat(migration.action));
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, db.deleteRecords('migrations', {
                        name: migration.name,
                    })];
                case 10:
                    _b.sent();
                    console.log("[\u2714\uFE0F] Rolled back migration ".concat(migration.name, " (").concat(migration.ext, ") with action ").concat(migration.action));
                    return [3 /*break*/, 11];
                case 11:
                    i++;
                    return [3 /*break*/, 3];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function parseFilepath(filePath) {
    var filenamePattern = /([0-9]+)-([A-z0-9]+)\.(down|up)\.(sql|js)/g;
    var matchesRaw = filenamePattern.exec(filePath);
    if (matchesRaw !== null) {
        var matches = Array.from(matchesRaw);
        var fileName = matches[0], timestamp = matches[1], scriptName = matches[2], actionRaw = matches[3], extension = matches[4];
        var type = getFileTypeFromExt(extension);
        var action = getActionFromActionRaw(actionRaw);
        var ext = getExtensionFromExtensionRaw(extension);
        var name = "".concat(timestamp, "-").concat(scriptName);
        return {
            name: name,
            filePath: filePath,
            type: type,
            action: action,
            fileName: fileName,
            createdTime: parseInt(timestamp),
            scriptName: scriptName,
            ext: ext,
        };
    }
    return null;
}
exports.parseFilepath = parseFilepath;
/**
 * Get the valid file type from a file extension
 * @param ext
 */
function getFileTypeFromExt(ext) {
    switch (ext) {
        case MigrationFileExtensions_1.MigrationFileExtensions.SQL: {
            return MigrationFileTypes_1.MigrationFileTypes.SQL;
        }
        case MigrationFileExtensions_1.MigrationFileExtensions.JS: {
            return MigrationFileTypes_1.MigrationFileTypes.JS;
        }
        default: {
            throw new UnsupportedFileExtensionException(ext);
        }
    }
}
function getActionFromActionRaw(actionRaw) {
    switch (actionRaw) {
        case MigrationAction_1.MigrationAction.Up: {
            return MigrationAction_1.MigrationAction.Up;
        }
        case MigrationAction_1.MigrationAction.Down: {
            return MigrationAction_1.MigrationAction.Down;
        }
        default: {
            throw new UnsupportedMigrationAction(actionRaw);
        }
    }
}
function getExtensionFromExtensionRaw(extRaw) {
    switch (extRaw) {
        case MigrationFileExtensions_1.MigrationFileExtensions.SQL: {
            return MigrationFileExtensions_1.MigrationFileExtensions.SQL;
        }
        case MigrationFileExtensions_1.MigrationFileExtensions.JS: {
            return MigrationFileExtensions_1.MigrationFileExtensions.JS;
        }
        default: {
            throw new UnsupportedFileExtensionException(extRaw);
        }
    }
}
var NotDirectoryException = /** @class */ (function (_super) {
    __extends(NotDirectoryException, _super);
    function NotDirectoryException(migrationPath) {
        return _super.call(this, "Migration path is not a directory: ".concat(migrationPath)) || this;
    }
    return NotDirectoryException;
}(Error));
var UnsupportedFileExtensionException = /** @class */ (function (_super) {
    __extends(UnsupportedFileExtensionException, _super);
    function UnsupportedFileExtensionException(fileExt) {
        return _super.call(this, "Unsupported file extension: ".concat(fileExt)) || this;
    }
    return UnsupportedFileExtensionException;
}(Error));
var UnsupportedMigrationAction = /** @class */ (function (_super) {
    __extends(UnsupportedMigrationAction, _super);
    function UnsupportedMigrationAction(action) {
        return _super.call(this, "Unsupported migration action: ".concat(action)) || this;
    }
    return UnsupportedMigrationAction;
}(Error));
var UnsupportedFileExtensionProcessorException = /** @class */ (function (_super) {
    __extends(UnsupportedFileExtensionProcessorException, _super);
    function UnsupportedFileExtensionProcessorException(fileExt) {
        return _super.call(this, "Unsupported file extenion: ".concat(fileExt, " ")) || this;
    }
    return UnsupportedFileExtensionProcessorException;
}(Error));
var MigrationFailedError = /** @class */ (function (_super) {
    __extends(MigrationFailedError, _super);
    function MigrationFailedError(migrationFile) {
        var _this = _super.call(this, "Migration ".concat(migrationFile.fileName, " failed to process")) || this;
        _this.migrationFile = migrationFile;
        return _this;
    }
    return MigrationFailedError;
}(Error));
var DuplicateMigrationNameError = /** @class */ (function (_super) {
    __extends(DuplicateMigrationNameError, _super);
    function DuplicateMigrationNameError(migrationFile) {
        var _this = _super.call(this, "Duplicate migration found: ".concat(migrationFile.fileName)) || this;
        _this.migrationFile = migrationFile;
        return _this;
    }
    return DuplicateMigrationNameError;
}(Error));
//# sourceMappingURL=migrateUpgrade.js.map