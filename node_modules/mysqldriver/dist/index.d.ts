import { ConnectionProvider } from './classes/ConnectionProvider';
import { DatabaseDriver } from './classes/DatabaseDriver';
import { ConnectionConfig } from './interfaces/ConnectionConfig';
declare function connect(config: ConnectionConfig): DatabaseDriver;
export { ConnectionProvider, DatabaseDriver, connect, ConnectionConfig };
//# sourceMappingURL=index.d.ts.map