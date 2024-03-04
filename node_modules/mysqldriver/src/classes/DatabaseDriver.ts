import UUIDv4 from 'uuid/v4';
import { ConnectionProvider } from './ConnectionProvider';
import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { containsSpecialChars, query, QueryOptions } from '../lib/query';
import { selectRecordRaw, selectRecordRawCount } from '../lib/select';
import {
  prepareRecord,
  getTableNames,
  getTableInfo,
  SQLTableColumn,
  tableExists,
} from '../lib/database';
import { insertRecordRaw } from '../lib/insert';
import { updateRecordsRaw } from '../lib/update';
import { deleteRecordRaw } from '../lib/delete';
import {
  getJSSchema,
  tableGetJSSchema,
  JSTableSchema,
} from '../lib/javascript';
import { formatDate } from '../lib/format/date';
import { makeQueryBuilder, QueryBuilder } from './QueryBuilder';
export class DatabaseDriver {
  private config: DatabaseConfig;
  private provider: ConnectionProvider;
  public readonly builder: QueryBuilder;
  constructor(cfg: DatabaseConfig) {
    this.config = cfg;
    this.provider = new ConnectionProvider(cfg);
    this.builder = makeQueryBuilder();
    Object.freeze(this);
  }
  private debugLog(val: string, debugInfo: any) {
    if (this.config.debug?.enabled) {
      this.config.debug?.logger?.(
        `[${formatDate(new Date())}] DatabaseDriver: ${val}`,
        debugInfo
      );
    }
  }
  generateId() {
    return UUIDv4();
  }
  /**
   * Insert records into the database
   * @param table_name The name of the table to insert the records into
   * @param record The record to be insert into the database
   */
  async insertRecord(table_name: string, record: any) {
    let connection = await this.provider.getConnection();
    let self = this;
    let { database } = self.config;
    let clean_record = await prepareRecord(this.config)(
      connection,
      database,
      table_name,
      record
    );
    let res = await insertRecordRaw(this.config)(
      connection,
      table_name,
      clean_record
    );
    return res;
  }
  /**
   * Get records from a table that match the where criteria
   * @param table_name
   * @param where The search criteria to do a match
   */
  async getRecords<T = any>(
    table_name: string,
    where: any,
    order_by: Array<{ key: string; order: 'ASC' | 'DESC' }> = [],
    options?: QueryOptions
  ): Promise<T[]> {
    let connection = await this.provider.getConnection();
    return await selectRecordRaw(this.config)(
      connection,
      table_name,
      where,
      order_by,
      options
    );
  }
  /**
   * Get records count from a table that match the where criteria
   * @param table_name
   * @param where The search criteria to do a match
   */
  async getRecordsCount(
    table_name: string,
    where: any,
    order_by: Array<{ key: string; order: 'ASC' | 'DESC' }> = [],
    options?: QueryOptions
  ): Promise<number> {
    let connection = await this.provider.getConnection();
    return await selectRecordRawCount(this.config)(
      connection,
      table_name,
      where,
      order_by,
      options
    );
  }

  /**
   * Get record from a table that match the where criteria
   * @param table_name
   * @param where The search criteria to do a match
   */
  async getRecord(
    table_name: string,
    where: any,
    order_by: Array<{ key: string; order: 'ASC' | 'DESC' }> = []
  ) {
    let connection = await this.provider.getConnection();
    const result = await selectRecordRaw(this.config)(
      connection,
      table_name,
      where,
      order_by,
      { limit: { offset: 0, page_size: 1 } }
    );
    if (result.length > 1) {
      throw new Error(`MySQLDriver.getRecord: More than one record found.`);
    }
    if (result.length === 0) {
      return undefined;
    }
    return result[0];
  }

  /**
   * Update records in a given table
   * @param table_name
   * @param properties The properties to be updated
   * @param where THe criteria to search
   */
  async updateRecords(table_name: string, properties: any, where: any) {
    let self = this;
    let connection = await this.provider.getConnection();

    let { database } = self.config;
    let clean_properties = await prepareRecord(this.config)(
      connection,
      database,
      table_name,
      properties
    );
    return await updateRecordsRaw(this.config)(
      connection,
      table_name,
      clean_properties,
      where
    );
  }
  /**
   * Delete records from a table that match there where criteria
   * @param table_name
   * @param where
   */
  async deleteRecords(table_name: string, where: any) {
    let connection = await this.provider.getConnection();
    return await deleteRecordRaw(this.config)(connection, table_name, where);
  }

  /**
   * Get a record via an sql query
   * @param sql
   * @param values
   */
  async getRecordSql<T = any>(
    sql: string,
    values?: Array<any>
  ): Promise<T | null> {
    let self = this;
    let records = await self.getRecordsSql(sql, values);
    if (records.length > 1) {
      throw new Error(
        `MySQLDriver.getRecordSql: More than one record found for value.`
      );
    }
    if (records.length === 0) {
      return null;
    }

    return records[0];
  }
  /**
   * Gets records from the database via a provided sql statement
   * @param sql
   * @param values
   */
  async getRecordsSql<T = any>(
    sql: string,
    values?: Array<any>
  ): Promise<Array<T>> {
    let connection = await this.provider.getConnection();
    return await query(this.config)(connection, sql, values);
  }

  /**
   * Gets all tables in the current database
   */
  async getTableNames() {
    let connection = await this.provider.getConnection();
    const self = this;
    let { database } = self.config;
    const table_names = await getTableNames(this.config)(connection, database);
    return table_names;
  }
  /**
   * Get the table information from the information schema
   * @param table_name
   */
  async getTableInfo(table_name: string): Promise<SQLTableColumn[]> {
    let connection = await this.provider.getConnection();
    let self = this;
    let { database } = self.config;
    let info = await getTableInfo(this.config)(
      connection,
      database,
      table_name
    );
    return info;
  }

  /**
   * Get the field names for a given table
   * @param table_name
   */
  async getTableFieldNames(table_name: string): Promise<string[]> {
    let connection = await this.provider.getConnection();
    let self = this;
    let { database } = self.config;
    let info = await getTableInfo(this.config)(
      connection,
      database,
      table_name
    );
    return info.map((field_info) => field_info.COLUMN_NAME);
  }
  /**
   * Query the database connection asynchronously
   * @param sql
   * @param values
   */
  async query<T = any>(
    sql: string,
    values: Array<any> = []
  ): Promise<Array<T>> {
    let connection = await this.provider.getConnection();
    const result = await query(this.config)(connection, sql, values);
    return result;
  }

  async closeConnection() {
    let connection = await this.provider.getConnection();
    if (connection) {
      await new Promise<void>((resolve, reject) => {
        connection.end((err) => {
          err ? reject(err) : resolve();
        });
      });
    }
  }

  /**
   * Gets the schema of the database as an array of table schema objects
   */
  async getJSSchema(): Promise<JSTableSchema[]> {
    let connection = await this.provider.getConnection();
    let { database } = this.config;
    return await getJSSchema(this.config)(connection, database);
  }
  /**
   *
   * @param table_name
   */
  async tableGetJSSchema(table_name: string): Promise<JSTableSchema> {
    let connection = await this.provider.getConnection();
    let { database } = this.config;
    return await tableGetJSSchema(this.config)(
      connection,
      database,
      table_name
    );
  }
  /**
   * Checks if a table already exists
   * @param table_name
   */
  async tableExists(table_name: string): Promise<boolean> {
    let connection = await this.provider.getConnection();
    let { database } = this.config;
    return await tableExists(this.config)(connection, database, table_name);
  }
}
