import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
export class ConnectionProvider {
  private cfg: DatabaseConfig;
  private connection: DatabaseConnection;
  constructor(cfg: DatabaseConfig) {
    this.cfg = cfg;
    this.connection = this.createConnection();
    this.connection.on('error', this.handleConnectionError.bind(this));
  }
  private createConnection() {
    if (this.cfg.debug?.enabled) {
      this.cfg.debug?.logger?.('ConnectionProvider: Creating connection');
    }
    return this.cfg.createConnection();
  }
  private handleConnectionError() {
    this.connection = this.createConnection();
    this.connection.on('error', this.handleConnectionError.bind(this));
  }
  async getConnection(): Promise<DatabaseConnection> {
    if (this.connection.isDisconnected()) {
      this.connection = this.createConnection();
    }
    return this.connection;
  }
}

export type ConnectionEvent = 'error' | null;
