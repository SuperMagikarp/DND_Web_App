import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
export declare class ConnectionProvider {
    private cfg;
    private connection;
    constructor(cfg: DatabaseConfig);
    private createConnection;
    private handleConnectionError;
    getConnection(): Promise<DatabaseConnection>;
}
export declare type ConnectionEvent = 'error' | null;
//# sourceMappingURL=ConnectionProvider.d.ts.map