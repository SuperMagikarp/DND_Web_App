import { DatabaseConnection } from './DatabaseConnection';
import { DebugConfig } from './DebugConfig';
export interface DatabaseConfig {
    database: string;
    debug?: DebugConfig;
    createConnection: () => DatabaseConnection;
}
//# sourceMappingURL=DatabaseConfig.d.ts.map