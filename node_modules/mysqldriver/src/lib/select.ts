import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import {
  query,
  QueryOptions,
  containsSpecialChars,
  ALLOWED_OPERATORS,
} from './query';
export const selectRecordRaw = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    table_name: string,
    where: any = {},
    order_by: Array<{ key: string; order: 'ASC' | 'DESC' }>,
    options?: QueryOptions
  ): Promise<any[]> {
    const { sql, params, isResultEmpty } = prepareSelectStatement(
      table_name,
      where,
      order_by,
      options
    );
    if (isResultEmpty) {
      return [];
    }
    let data = await query(config)(connection, sql, params);
    return data;
  };

/**
 * INTERNAL: Select count of records from a given table without any data processing
 * @param table_name
 * @param where
 */
export const selectRecordRawCount = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    table_name: string,
    where: any = {},
    order_by: Array<{ key: string; order: 'ASC' | 'DESC' }>,
    options?: QueryOptions
  ): Promise<number> {
    const funcName = 'selectRecordRawCount';
    const { sql, params, isResultEmpty } = prepareSelectStatement(
      table_name,
      where,
      order_by,
      options
    );
    if (isResultEmpty) {
      return 0;
    }
    let sql_count = `SELECT COUNT(*) AS count from (
    ${sql}) AS T`;
    let records = await query(config)(connection, sql_count, params);
    return records[0].count;
  };

/**
 * INTERNAL: Prepare select statement from options
 * @param table_name
 * @param where
 */
export function prepareSelectStatement(
  table_name: string,
  where: any = {},
  order_by: Array<{ key: string; order: 'ASC' | 'DESC' }>,
  options?: QueryOptions
) {
  const funcName = '_prepareSelectStatement';
  const select_sql = `SELECT * FROM \`${table_name}\``;
  let isResultEmpty = false;
  let params: any[] = [];

  //Validations
  let where_options = options?.where;
  let where_operator = where_options?.operator || 'AND';
  if (where_operator) {
    if (!ALLOWED_OPERATORS[where_operator]) {
      throw new Error(`${funcName}: Invalid operator '${where_operator}'`);
    }
  }
  //Construction
  const where_clause = Object.keys(where ? where : {})
    .map((key) => {
      if (containsSpecialChars(key)) {
        throw new Error(
          `${funcName}: Special character found in key: '${key}'`
        );
      }
      let value = where[key];
      if (
        where_options?.wildcard ||
        (where_options?.wildcardAfter && where_options.wildcardAfter)
      ) {
        if (Array.isArray(value)) {
          throw new Error(
            `${funcName}: Wildcard search not supported for arrays.`
          );
        }
        params.push(`%${value}%`);
        return `${key} LIKE ?`;
      } else if (where_options?.wildcardBefore) {
        if (Array.isArray(value)) {
          throw new Error(
            `${funcName}: Wildcard search not supported for arrays.`
          );
        }
        params.push(`%${value}`);
        return `${key} LIKE ?`;
      } else if (where_options?.wildcardAfter) {
        if (Array.isArray(value)) {
          throw new Error(
            `${funcName}: Wildcard search not supported for arrays.`
          );
        }
        params.push(`${value}%`);
        return `${key} LIKE ?`;
      } else {
        params.push(value);
        if (Array.isArray(value)) {
          if (value.length === 0) {
            isResultEmpty = true;
          }
          return `\`${key}\` IN (?)`;
        } else {
          return `\`${key}\` = ?`;
        }
      }
    })
    .reduce((state, cur, idx) => {
      if (idx === 0) {
        state = `WHERE ${cur}`;
      } else {
        state += ` ${where_operator} ${cur}`;
      }
      return state;
    }, '');

  //Compute order by caluse
  const order_by_clause = (order_by ? order_by : [])
    .map((rule) => {
      let { key = '', order = '' } = rule || {};
      if (containsSpecialChars(key)) {
        throw new Error(
          `${funcName}: Special character found in key: '${key}'`
        );
      }
      if (!key || !order || !(typeof order === 'string')) {
        throw new Error(
          `${funcName}: Invalid order by config provided [${key} : ${order}]`
        );
      }
      let property_name = key;
      let sort_order = order.trim().toUpperCase();
      //Check that sort_order is either ASC or DESC
      if (['ASC', 'DESC'].indexOf(sort_order) === -1) {
        throw new Error(
          `${funcName}: Invalid sort order provided - '${sort_order}`
        );
      }
      return `\`${property_name}\` ${sort_order}`;
    })
    .reduce((state, cur, idx) => {
      if (idx === 0) {
        state += `ORDER BY ${cur}`;
      } else {
        state += `,\n${cur}`;
      }
      return state;
    }, '');
  //Compute limit clause
  let { limit = undefined } = options || {};
  let limit_clause = '';
  if (limit) {
    let { offset, page_size } = limit;
    if (offset == undefined) {
      offset = 0;
    }
    if (typeof offset !== 'number') {
      throw new Error(`${funcName}: offset in limit option must be a number.`);
    }
    if (typeof page_size !== 'number') {
      throw new Error(
        `${funcName}: page_size in limit option must be a number.`
      );
    }
    limit_clause += ` LIMIT ?, ?`;
    params.push(offset);
    params.push(page_size);
  }
  let sql = `${select_sql} ${where_clause} ${order_by_clause} ${limit_clause}`;
  return {
    sql,
    params,
    isResultEmpty,
  };
}
