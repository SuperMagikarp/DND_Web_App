import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { QueryOptions } from '../lib/query';
import { SQLTableColumn } from '../lib/database';
import { JSTableSchema } from '../lib/javascript';
import { QueryBuilder } from './QueryBuilder';
export declare class DatabaseDriver {
    private config;
    private provider;
    readonly builder: QueryBuilder;
    constructor(cfg: DatabaseConfig);
    private debugLog;
    generateId(): string;
    /**
     * Insert records into the database
     * @param table_name The name of the table to insert the records into
     * @param record The record to be insert into the database
     */
    insertRecord(table_name: string, record: any): Promise<any>;
    /**
     * Get records from a table that match the where criteria
     * @param table_name
     * @param where The search criteria to do a match
     */
    getRecords<T = any>(table_name: string, where: any, order_by?: Array<{
        key: string;
        order: 'ASC' | 'DESC';
    }>, options?: QueryOptions): Promise<T[]>;
    /**
     * Get records count from a table that match the where criteria
     * @param table_name
     * @param where The search criteria to do a match
     */
    getRecordsCount(table_name: string, where: any, order_by?: Array<{
        key: string;
        order: 'ASC' | 'DESC';
    }>, options?: QueryOptions): Promise<number>;
    /**
     * Get record from a table that match the where criteria
     * @param table_name
     * @param where The search criteria to do a match
     */
    getRecord(table_name: string, where: any, order_by?: Array<{
        key: string;
        order: 'ASC' | 'DESC';
    }>): Promise<any>;
    /**
     * Update records in a given table
     * @param table_name
     * @param properties The properties to be updated
     * @param where THe criteria to search
     */
    updateRecords(table_name: string, properties: any, where: any): Promise<any>;
    /**
     * Delete records from a table that match there where criteria
     * @param table_name
     * @param where
     */
    deleteRecords(table_name: string, where: any): Promise<any>;
    /**
     * Get a record via an sql query
     * @param sql
     * @param values
     */
    getRecordSql<T = any>(sql: string, values?: Array<any>): Promise<T | null>;
    /**
     * Gets records from the database via a provided sql statement
     * @param sql
     * @param values
     */
    getRecordsSql<T = any>(sql: string, values?: Array<any>): Promise<Array<T>>;
    /**
     * Gets all tables in the current database
     */
    getTableNames(): Promise<any[]>;
    /**
     * Get the table information from the information schema
     * @param table_name
     */
    getTableInfo(table_name: string): Promise<SQLTableColumn[]>;
    /**
     * Get the field names for a given table
     * @param table_name
     */
    getTableFieldNames(table_name: string): Promise<string[]>;
    /**
     * Query the database connection asynchronously
     * @param sql
     * @param values
     */
    query<T = any>(sql: string, values?: Array<any>): Promise<Array<T>>;
    closeConnection(): Promise<void>;
    /**
     * Gets the schema of the database as an array of table schema objects
     */
    getJSSchema(): Promise<JSTableSchema[]>;
    /**
     *
     * @param table_name
     */
    tableGetJSSchema(table_name: string): Promise<JSTableSchema>;
    /**
     * Checks if a table already exists
     * @param table_name
     */
    tableExists(table_name: string): Promise<boolean>;
}
//# sourceMappingURL=DatabaseDriver.d.ts.map