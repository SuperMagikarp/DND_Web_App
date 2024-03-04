"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var migrateUpgrade_1 = require("./migrateUpgrade");
var MigrationFileTypes_1 = require("../interfaces/MigrationFileTypes");
var MigrationAction_1 = require("../interfaces/MigrationAction");
var chai_1 = require("chai");
var MigrationFileExtensions_1 = require("../interfaces/MigrationFileExtensions");
describe('Migrate Upgrade Usecase', function () {
    it('Parse Filepath (SQL, up)', function () {
        var createdTime = 1598155575896;
        var scriptName = 'createUserTable';
        var actionRaw = 'up';
        var ext = 'sql';
        var name = "".concat(createdTime, "-").concat(scriptName);
        var fileName = "".concat(name, ".").concat(actionRaw, ".").concat(ext);
        var filePath = createTestPath(fileName);
        var expected = {
            name: name,
            filePath: filePath,
            type: MigrationFileTypes_1.MigrationFileTypes.SQL,
            action: MigrationAction_1.MigrationAction.Up,
            createdTime: createdTime,
            fileName: fileName,
            scriptName: scriptName,
            ext: MigrationFileExtensions_1.MigrationFileExtensions.SQL,
        };
        var actual = (0, migrateUpgrade_1.parseFilepath)(filePath);
        var keys = Object.keys(expected);
        if (actual !== null) {
            for (var key in keys) {
                (0, chai_1.expect)(actual[key]).to.be.equal(expected[key], "".concat(key, " values are not equal"));
            }
        }
        else {
            (0, chai_1.expect)(actual).not.equal(null, "Migration file cannot be null");
        }
    });
    it('Parse Filepath (SQL, down)', function () {
        var createdTime = 1598155575896;
        var scriptName = 'createUserTable';
        var actionRaw = 'down';
        var ext = 'sql';
        var name = "".concat(createdTime, "-").concat(scriptName);
        var fileName = "".concat(name, ".").concat(actionRaw, ".").concat(ext);
        var filePath = createTestPath(fileName);
        var expected = {
            name: name,
            filePath: filePath,
            type: MigrationFileTypes_1.MigrationFileTypes.SQL,
            action: MigrationAction_1.MigrationAction.Down,
            createdTime: createdTime,
            fileName: fileName,
            scriptName: scriptName,
            ext: MigrationFileExtensions_1.MigrationFileExtensions.SQL,
        };
        var actual = (0, migrateUpgrade_1.parseFilepath)(filePath);
        var keys = Object.keys(expected);
        if (actual !== null) {
            for (var key in keys) {
                (0, chai_1.expect)(actual[key]).to.be.equal(expected[key], "".concat(key, " values are not equal"));
            }
        }
        else {
            (0, chai_1.expect)(actual).not.equal(null, "Migration file cannot be null");
        }
    });
});
function createTestPath(fileName) {
    return "path/to/dir/".concat(fileName);
}
//# sourceMappingURL=migrateUpgrade.spec.js.map