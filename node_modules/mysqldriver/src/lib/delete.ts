import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { containsSpecialChars, query } from './query';

/**
 * INTERNAL: Delete records from a given table without any data processing
 * @param table_name
 * @param where
 */
export const deleteRecordRaw = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    table_name: string,
    where: any
  ) {
    const funcName = 'deleteRecordRaw';
    const select_sql = `DELETE FROM \`${table_name}\``;
    let params: any[] = [];
    const conditions = Object.keys(where).map((key) => {
      if (containsSpecialChars(key)) {
        throw new Error(
          `${funcName}: Special character found in key: '${key}'`
        );
      }
      let value = where[key];
      params.push(value);
      return `\`${key}\` = ?`;
    });
    if (conditions.length < 1) {
      throw new Error(
        `${funcName}: Unable to delete records without conditions`
      );
    }
    const where_sql = conditions.reduce((last, cur, index) => {
      return `${last} AND ${cur}`;
    });
    return await query(config)(
      connection,
      `${select_sql} WHERE ${where_sql}`,
      params
    );
  };
