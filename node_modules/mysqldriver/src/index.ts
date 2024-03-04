import { ConnectionProvider } from './classes/ConnectionProvider';
import { DatabaseDriver } from './classes/DatabaseDriver';
import { DatabaseConfig } from './interfaces/DatabaseConfig';
import serverlessMySQL from 'serverless-mysql';
import { ConnectionConfig } from './interfaces/ConnectionConfig';

function connect(config: ConnectionConfig) {
  if (!config.host) {
    throw new MissingConfigParamException('host', config.host);
  }
  if (!config.database) {
    throw new MissingConfigParamException('database', config.database);
  }
  if (!config.user) {
    throw new MissingConfigParamException('user', config.user);
  }
  if (!config.port) {
    config.port = 3306;
  }
  if (config.requireSsl) {
    if (!config?.ssl?.ca) {
      throw new MissingConfigParamException('ssl ca', '<secret>');
    }
  }
  const { debug, ...connectionConfig } = config;
  let dbCfg: DatabaseConfig = {
    database: config.database,
    debug,
    createConnection: () => {
      let conn = serverlessMySQL({
        config: connectionConfig,
      });
      if (connectionConfig.autoClose) {
        conn = withAutoCloseConnection(
          conn,
          connectionConfig.autoClose.intervalMs
        );
      }
      return {
        destroy: () => {
          conn.quit();
        },
        on: (ev, cb) => {},
        query: (q, v, cb) => {
          conn
            .query(q, v)
            .then((r) => {
              let data: any = r;
              return { data, err: null };
            })
            .catch((err) => ({ err, data: null }))
            .then((result) => {
              let { err, data } = result;
              cb(err, data);
            });
        },
        end: (cb) => {
          const terminateConnection = async () => {
            await conn.end();
            await conn.quit();
          };
          return terminateConnection().then(() => cb(null));
        },
        isDisconnected: () => {
          return false;
        },
      };
    },
  };
  return new DatabaseDriver(dbCfg);
}

/**
 * Automatically close the database connection after the given timeout
 * @param conn
 * @param timeoutMs
 * @returns
 */
const withAutoCloseConnection = (
  conn: serverlessMySQL.ServerlessMysql,
  timeoutMs: number
): serverlessMySQL.ServerlessMysql => {
  let timeout;
  const start = () => {
    timeout = setTimeout(() => {
      (async () => {
        await conn.end();
        await conn.quit();
      })();
    }, timeoutMs);
  };
  const stop = () => clearTimeout(timeout);
  const reset = () => {
    clearTimeout(timeout);
    start();
  };
  start();
  return {
    ...conn,
    end: () => {
      stop();
      return conn.end();
    },
    query: (...p) => {
      reset();
      return conn.query(...p);
    },
  };
};

export { ConnectionProvider, DatabaseDriver, connect, ConnectionConfig };

class MissingConfigParamException extends Error {
  constructor(key: string, value: any) {
    super(`MySQLDriver: Missing config: ${key} has value ${value}`);
  }
}
