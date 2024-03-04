import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { query } from './query';
export const ALIAS_COLUMN_NAME = 'COLUMN_NAME';
export const ALIAS_DATA_TYPE = 'DATA_TYPE';
export const ALIAS_COLUMN_KEY = 'COLUMN_KEY';
export const ALIAS_CHARACTER_MAXIMUM_LENGTH = 'CHARACTER_MAXIMUM_LENGTH';
export const ALIAS_IS_NULLABLE = 'IS_NULLABLE';
export const ALIAS_COLUMN_DEFAULT = 'COLUMN_DEFAULT';
export const ALIAS_TABLE_NAME = 'TABLE_NAME';
/**
 * Checks the record against the database schema and removes any irrelevant fields for insertion
 * @param database_name
 * @param table_name
 * @param record_raw
 */
export const prepareRecord = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    database_name: string,
    table_name: string,
    record_raw: any
  ) {
    if (!(typeof table_name === 'string')) {
      let error: any = new Error(
        `MySQLDriver in function prepareRecord: Provided table name is not a string.`
      );
      error.table_name = table_name;
      error.record_raw = record_raw;
      throw error;
    }
    let allowed_columns = await getTableInfo(config)(
      connection,
      database_name,
      table_name
    );
    const allowed_column_index = allowed_columns.reduce((state, column) => {
      state[column.COLUMN_NAME] = column;
      return state;
    }, {});

    //check for invalid properties
    const user_input_column_names = Object.keys(record_raw);
    for (let column_name of user_input_column_names) {
      if (!allowed_column_index[column_name]) {
        throw new Error(
          `MySQLDriver in function prepareRecord: Invalid column: ${column_name}.`
        );
      }
    }

    //start preparing the record
    let prepared_record: any = {};
    allowed_columns.map((field) => {
      let key = field[ALIAS_COLUMN_NAME];
      if (key in record_raw && record_raw[key] !== undefined) {
        //Only add items that have been specified in the record, and are not undefined in value
        let value = record_raw[key];
        prepared_record[key] = value;
      }
    });
    return prepared_record;
  };

//INTERNAL FUNCTIONS
/**
 * Get the field
 * @param database_name
 * @param table_name
 */
export const getTableInfo = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    database_name: string,
    table_name: string
  ): Promise<SQLTableColumn[]> {
    let result: Array<SQLTableColumn> = await query(config)(
      connection,
      `SELECT 
    \`COLUMN_NAME\` as '${ALIAS_COLUMN_NAME}', 
    \`DATA_TYPE\` AS '${ALIAS_DATA_TYPE}', 
    \`COLUMN_KEY\` AS '${ALIAS_COLUMN_KEY}', 
    \`CHARACTER_MAXIMUM_LENGTH\` as '${ALIAS_CHARACTER_MAXIMUM_LENGTH}',
    \`IS_NULLABLE\` as '${ALIAS_IS_NULLABLE}',
    \`COLUMN_DEFAULT\` as '${ALIAS_COLUMN_DEFAULT}'
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE \`TABLE_NAME\` = ? AND \`TABLE_SCHEMA\` = ?`,
      [table_name, database_name]
    );
    if (result.length === 0) {
      throw new Error(
        `Table '${table_name}' does not exist on database '${database_name}'`
      );
    }
    return result;
  };

/**
 * Gets all table names in a given database
 * @param database_name
 */
export const getTableNames = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    database_name: string
  ): Promise<any[]> {
    const tables: Array<any> = await query(config)(
      connection,
      `SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES WHERE \`TABLE_SCHEMA\` = ?`,
      [database_name]
    );
    const table_names = tables.map((table) => table[ALIAS_TABLE_NAME]);
    return table_names;
  };

/**
 * Checks if a table exists
 * @param database_name
 * @param table_name
 */
export const tableExists = (config: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    database_name: string,
    table_name: string
  ): Promise<boolean> {
    const rows: Array<any> = await query(config)(
      connection,
      `SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES WHERE \`TABLE_SCHEMA\` = ? AND \`TABLE_NAME\` = ?`,
      [database_name, table_name]
    );
    return rows.length > 0;
  };

export interface SQLTableColumn {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  COLUMN_KEY: string;
  CHARACTER_MAXIMUM_LENGTH: number;
  IS_NULLABLE: number;
  COLUMN_DEFAULT?: string;
}
