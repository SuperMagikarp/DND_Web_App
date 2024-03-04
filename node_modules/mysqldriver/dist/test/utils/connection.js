"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDBConfig = exports.makeTestConnectionConfig = void 0;
var mysql_1 = __importDefault(require("mysql"));
function makeTestConnectionConfig() {
    return {
        host: '127.0.0.1',
        database: 'mysqldriver_test',
        password: 'P@ssw0rd',
        user: 'testuser',
        charset: 'utf8mb4',
    };
}
exports.makeTestConnectionConfig = makeTestConnectionConfig;
function makeDBConfig() {
    var dbConfig = {
        database: 'mysqldriver_test',
        // debug: {
        //   enabled: true,
        //   logger: (v) => console.log(v),
        // },
        createConnection: function () {
            var conn = mysql_1.default.createConnection(makeTestConnectionConfig());
            return {
                destroy: function () {
                    conn.destroy();
                },
                on: function (ev, cb) { return conn.on(ev || '', cb); },
                query: function (q, v, cb) { return conn.query(q, v, cb); },
                end: function (cb) {
                    return conn.end(cb);
                },
                isDisconnected: function () {
                    return conn.state == 'disconnected' || conn.state == 'protocol_error';
                },
            };
        },
    };
    return dbConfig;
}
exports.makeDBConfig = makeDBConfig;
//# sourceMappingURL=connection.js.map