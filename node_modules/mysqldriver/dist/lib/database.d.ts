import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
export declare const ALIAS_COLUMN_NAME = "COLUMN_NAME";
export declare const ALIAS_DATA_TYPE = "DATA_TYPE";
export declare const ALIAS_COLUMN_KEY = "COLUMN_KEY";
export declare const ALIAS_CHARACTER_MAXIMUM_LENGTH = "CHARACTER_MAXIMUM_LENGTH";
export declare const ALIAS_IS_NULLABLE = "IS_NULLABLE";
export declare const ALIAS_COLUMN_DEFAULT = "COLUMN_DEFAULT";
export declare const ALIAS_TABLE_NAME = "TABLE_NAME";
/**
 * Checks the record against the database schema and removes any irrelevant fields for insertion
 * @param database_name
 * @param table_name
 * @param record_raw
 */
export declare const prepareRecord: (config: DatabaseConfig) => (connection: DatabaseConnection, database_name: string, table_name: string, record_raw: any) => Promise<any>;
/**
 * Get the field
 * @param database_name
 * @param table_name
 */
export declare const getTableInfo: (config: DatabaseConfig) => (connection: DatabaseConnection, database_name: string, table_name: string) => Promise<SQLTableColumn[]>;
/**
 * Gets all table names in a given database
 * @param database_name
 */
export declare const getTableNames: (config: DatabaseConfig) => (connection: DatabaseConnection, database_name: string) => Promise<any[]>;
/**
 * Checks if a table exists
 * @param database_name
 * @param table_name
 */
export declare const tableExists: (config: DatabaseConfig) => (connection: DatabaseConnection, database_name: string, table_name: string) => Promise<boolean>;
export interface SQLTableColumn {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    COLUMN_KEY: string;
    CHARACTER_MAXIMUM_LENGTH: number;
    IS_NULLABLE: number;
    COLUMN_DEFAULT?: string;
}
//# sourceMappingURL=database.d.ts.map