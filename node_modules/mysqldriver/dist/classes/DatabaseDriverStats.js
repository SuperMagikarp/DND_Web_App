"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseDriverStatType = exports.DatabaseDriverStats = void 0;
var DatabaseDriverStats = /** @class */ (function () {
    function DatabaseDriverStats() {
        this.state = this.getInitialState();
    }
    DatabaseDriverStats.prototype.getInitialState = function () {
        var _a;
        return _a = {},
            _a[DatabaseDriverStatType.Query] = 0,
            _a;
    };
    DatabaseDriverStats.prototype.incrementStat = function (statType) {
        var count = this.state[statType] || 0;
        count += 1;
        this.state[statType] = count;
    };
    DatabaseDriverStats.prototype.getStat = function (statType) {
        return this.state[statType];
    };
    DatabaseDriverStats.prototype.reset = function () {
        this.state = this.getInitialState();
    };
    return DatabaseDriverStats;
}());
exports.DatabaseDriverStats = DatabaseDriverStats;
var DatabaseDriverStatType;
(function (DatabaseDriverStatType) {
    DatabaseDriverStatType["Query"] = "query";
})(DatabaseDriverStatType = exports.DatabaseDriverStatType || (exports.DatabaseDriverStatType = {}));
//# sourceMappingURL=DatabaseDriverStats.js.map