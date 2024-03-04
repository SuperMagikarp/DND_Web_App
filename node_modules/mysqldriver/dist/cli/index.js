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
exports.execute = void 0;
var actionTypes_1 = require("./constants/actionTypes");
var migration_1 = require("./infrastructure/controllers/migration");
var __1 = require("..");
function execute() {
    return __awaiter(this, void 0, void 0, function () {
        var args, binPath, scriptPath, actionRaw, optionsRaw, action, options, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    args = process.argv;
                    binPath = args[0], scriptPath = args[1], actionRaw = args[2], optionsRaw = args.slice(3);
                    action = processAction(actionRaw);
                    options = processOptions(optionsRaw);
                    return [4 /*yield*/, performAction(action, options)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
/**
 * Performance a set of actions in sequence
 * @param actions
 */
function performAction(action, options) {
    return __awaiter(this, void 0, void 0, function () {
        var config, port, caCertContent, defaultSslOption, requireSsl, rejectUnauthorised, val, db, defaultMigrationProcessor, controller, _a, count, count, defaultName, migrationName;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        host: process.env['DB_HOST'],
                        database: process.env['DB_DATABASE'],
                        password: process.env['DB_PASSWORD'],
                        user: process.env['DB_USERNAME'],
                        multipleStatements: true,
                    };
                    port = process.env['DB_PORT']
                        ? parseInt(process.env['DB_PORT'])
                        : undefined;
                    if (port) {
                        config.port = port;
                    }
                    caCertContent = process.env['DB_SSL_CA_CERTIFICATE'];
                    defaultSslOption = caCertContent ? 1 : 0;
                    requireSsl = parseInt("".concat(process.env['DB_REQUIRE_SSL']))
                        ? true
                        : defaultSslOption;
                    if (requireSsl && !caCertContent) {
                        throw new Error('DB_SSL_CA_CERTIFICATE must be provided.');
                    }
                    if (caCertContent) {
                        config.ssl = {
                            ca: Buffer.from(caCertContent, 'base64').toString(),
                        };
                        rejectUnauthorised = process.env['DB_SSL_ALLOW_SELF_SIGNED_CERT'];
                        if (rejectUnauthorised) {
                            val = parseInt(rejectUnauthorised);
                            if (val === 0) {
                                config.ssl = __assign(__assign({}, config.ssl), { rejectUnauthorized: false });
                            }
                        }
                    }
                    db = (0, __1.connect)(config);
                    return [4 /*yield*/, (0, migration_1.createDefaultMigrationProcessor)(db)];
                case 1:
                    defaultMigrationProcessor = _b.sent();
                    controller = new migration_1.MigrationController(db, defaultMigrationProcessor);
                    _a = action.type;
                    switch (_a) {
                        case actionTypes_1.ActionTypes.Migrate: return [3 /*break*/, 2];
                        case actionTypes_1.ActionTypes.Rollback: return [3 /*break*/, 4];
                        case actionTypes_1.ActionTypes.CreateMigration: return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 2:
                    count = options.count !== null && options.count !== undefined
                        ? options.count
                        : 1;
                    console.log("Applying migrations with count: ".concat(count));
                    return [4 /*yield*/, controller.upgrade('/migrations', count)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 4:
                    count = options.count !== null && options.count !== undefined
                        ? options.count
                        : 1;
                    console.log("Rolling back migrations with count: ".concat(count));
                    return [4 /*yield*/, controller.rollback('/migrations', count)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 6:
                    defaultName = 'migration';
                    migrationName = options.name ? options.name : defaultName;
                    return [4 /*yield*/, controller.createMigration('/migrations', migrationName)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    {
                        throw new InvalidActionTypeException(action.type);
                    }
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
/**
 * Prepare actions to be done based on options provided
 * @param action
 */
function processAction(action) {
    switch (action) {
        case 'migrate': {
            return { type: actionTypes_1.ActionTypes.Migrate, params: [] };
        }
        case 'rollback': {
            return { type: actionTypes_1.ActionTypes.Rollback, params: [] };
        }
        case 'create-migration': {
            return { type: actionTypes_1.ActionTypes.CreateMigration, params: [] };
        }
        default: {
            throw new InvalidActionException(action);
        }
    }
}
/**
 * Prepare actions to be done based on options provided
 * @param cliOptions
 */
function processOptions(cliOptions) {
    var config = {};
    for (var i = 0; i < cliOptions.length; i++) {
        var opt = cliOptions[i];
        switch (opt) {
            case Options.Count: {
                var count = parseInt(cliOptions[i + 1]);
                if (Number.isNaN(count)) {
                    throw new Error('Invalid count provided: ' + count);
                }
                config.count = count;
                i = i + 1; //Fast forward by 1
                break;
            }
            case Options.Name: {
                var name = cliOptions[i + 1];
                config.name = name;
                i = i + 1;
                break;
            }
            default: {
                throw new InvalidOptionException(opt);
            }
        }
    }
    return config;
}
var InvalidActionException = /** @class */ (function (_super) {
    __extends(InvalidActionException, _super);
    function InvalidActionException(action) {
        return _super.call(this, "Invalid action ".concat(action)) || this;
    }
    return InvalidActionException;
}(Error));
var InvalidOptionException = /** @class */ (function (_super) {
    __extends(InvalidOptionException, _super);
    function InvalidOptionException(option) {
        return _super.call(this, "Invalid option ".concat(option)) || this;
    }
    return InvalidOptionException;
}(Error));
var InvalidActionTypeException = /** @class */ (function (_super) {
    __extends(InvalidActionTypeException, _super);
    function InvalidActionTypeException(actionType) {
        return _super.call(this, "Invalid action type ".concat(actionType)) || this;
    }
    return InvalidActionTypeException;
}(Error));
var Options;
(function (Options) {
    Options["Count"] = "--count";
    Options["Name"] = "--name";
})(Options || (Options = {}));
//# sourceMappingURL=index.js.map