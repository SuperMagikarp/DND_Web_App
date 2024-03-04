import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { DatabaseConfig } from '../interfaces/DatabaseConfig';
/**
 * Gets the schema of the database as an array of table schema objects
 */
export declare const getJSSchema: (config: DatabaseConfig) => (connection: DatabaseConnection, database_name: string) => Promise<JSTableSchema[]>;
/**
 *
 * @param table_name
 */
export declare const tableGetJSSchema: (config: DatabaseConfig) => (connection: DatabaseConnection, database_name: string, table_name: string) => Promise<JSTableSchema>;
export interface JSField {
    column_name: string;
    data_type: string;
    key: string;
    max_length: number;
    is_nullable: number;
    default_value?: string;
}
export interface JSTableSchema {
    table_name: string;
    fields: Array<JSField>;
}
//# sourceMappingURL=javascript.d.ts.map