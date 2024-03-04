import tls from 'tls';
import { DebugConfig } from './DebugConfig';
export interface ConnectionConfig {
  host?: string;
  database?: string;
  password?: string;
  user?: string;
  port?: number;
  multipleStatements?: boolean;
  requireSsl?: boolean;
  ssl?: tls.SecureContextOptions & { rejectUnauthorized?: boolean };
  charset?: string;
  debug?: DebugConfig;
  /**
   * Automatically close the db connection after a number of seconds of inactivity
   */
  autoClose?: {
    intervalMs: number;
  };
}
