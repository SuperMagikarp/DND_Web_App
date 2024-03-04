import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { DatabaseConfig } from '../interfaces/DatabaseConfig';
/**
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
   * INTERNAL: Update records in a given table without any processing
   * @param table_name
   * @param properties The properties to be updated
   * @param where THe criteria to search
   */
export declare const updateRecordsRaw: (config: DatabaseConfig) => (connection: DatabaseConnection, table_name: string, properties: any, where: any) => Promise<any>;
//# sourceMappingURL=update.d.ts.map