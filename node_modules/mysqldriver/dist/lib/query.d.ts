import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
export declare const OPERATORS: {
    AND: string;
    OR: string;
};
export declare const ALLOWED_OPERATORS: {
    [x: string]: number;
};
/**
 * Query a connection with data
 * @param connection
 * @param query
 * @param values
 */
export declare const query: (config?: DatabaseConfig) => (connection: DatabaseConnection, query: string, values?: Array<any>) => Promise<any>;
export declare function containsSpecialChars(str_val: string): boolean;
export declare type QueryOptions = {
    limit?: QueryLimitOptions;
    where?: QueryWhereOptions;
};
export declare type QueryLimitOptions = {
    offset?: number;
    page_size: number;
};
export declare type QueryWhereOptions = {
    operator?: 'AND' | 'OR';
    wildcard?: boolean;
    wildcardBefore?: boolean;
    wildcardAfter?: boolean;
};
//# sourceMappingURL=query.d.ts.map