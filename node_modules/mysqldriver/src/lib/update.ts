import { containsSpecialChars, query } from './query';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { DatabaseConfig } from '../interfaces/DatabaseConfig';

/**
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
   * INTERNAL: Update records in a given table without any processing
   * @param table_name
   * @param properties The properties to be updated
   * @param where THe criteria to search
   */
export const updateRecordsRaw = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    table_name: string,
    properties: any,
    where: any
  ) {
    const funcName = 'updateRecordsRaw';
    if (!where || Object.keys(where).length < 1) {
      var error = new Error(
        `DatabaseHelper: Cannot update record without where clause.`
      );
      throw error;
    }
    const update_sql = `UPDATE \`${table_name}\``;
    let params: any[] = [];
    const properties_sql = Object.keys(properties)
      .map((key) => {
        if (containsSpecialChars(key)) {
          throw new Error(
            `${funcName}: Special character found in key: '${key}'`
          );
        }
        var property = properties[key];
        params.push(property);
        return `\`${key}\` = ?`;
      })
      .reduce((last, cur, index) => {
        return `${last}, ${cur}`;
      });

    const where_sql = Object.keys(where)
      .map((key) => {
        if (containsSpecialChars(key)) {
          throw new Error(
            `${funcName}: Special character found in key: '${key}'`
          );
        }
        var value = where[key];
        params.push(value);
        return `\`${key}\` = ?`;
      })
      .reduce((last, cur, index) => {
        return `${last} AND ${cur}`;
      });
    return await query(config)(
      connection,
      `${update_sql} SET ${properties_sql} WHERE ${where_sql}`,
      params
    );
  };
