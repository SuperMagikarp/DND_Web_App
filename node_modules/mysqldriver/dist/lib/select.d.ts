import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { QueryOptions } from './query';
export declare const selectRecordRaw: (config: DatabaseConfig) => (connection: DatabaseConnection, table_name: string, where: any, order_by: Array<{
    key: string;
    order: 'ASC' | 'DESC';
}>, options?: QueryOptions) => Promise<any[]>;
/**
 * INTERNAL: Select count of records from a given table without any data processing
 * @param table_name
 * @param where
 */
export declare const selectRecordRawCount: (config: DatabaseConfig) => (connection: DatabaseConnection, table_name: string, where: any, order_by: Array<{
    key: string;
    order: 'ASC' | 'DESC';
}>, options?: QueryOptions) => Promise<number>;
/**
 * INTERNAL: Prepare select statement from options
 * @param table_name
 * @param where
 */
export declare function prepareSelectStatement(table_name: string, where: any, order_by: Array<{
    key: string;
    order: 'ASC' | 'DESC';
}>, options?: QueryOptions): {
    sql: string;
    params: any[];
    isResultEmpty: boolean;
};
//# sourceMappingURL=select.d.ts.map