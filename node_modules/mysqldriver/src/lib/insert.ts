import { containsSpecialChars, query } from './query';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { DatabaseConfig } from '../interfaces/DatabaseConfig';

/**
 * INTERNAL: Insert records into the database without any processing
 * @param table_name The name of the table to insert the records into
 * @param record The record to be insert into the database
 */
export const insertRecordRaw = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    table_name: string,
    record: any
  ) {
    const funcName = '_insertRecordRaw';
    const insert_sql = `INSERT INTO \`${table_name}\``;
    let params: any[] = [];
    const keys_sql = Object.keys(record)
      .map((key) => {
        if (containsSpecialChars(key)) {
          throw new Error(
            `${funcName}: Special character found in key: '${key}'`
          );
        }
        let escaped_key = `\`${key}\``;
        let value = record[key];
        params.push(value);
        return escaped_key;
      })
      .reduce((last, cur, index) => {
        return `${last}, ${cur}`;
      });
    const values_sql = Object.keys(record)
      .map((key) => {
        return '?';
      })
      .reduce((last, cur, index) => {
        return `${last}, ${cur}`;
      });
    return await query(config)(
      connection,
      `${insert_sql} (${keys_sql}) VALUES (${values_sql})`,
      params
    );
  };
