import { MigrationResult } from './MigrationResult';
import { MigrationFile } from '../interfaces/MigrationFile';
/**
 * A map of file extensions to the respective handlers.
 */
export type MigrationProcessor = {
  [fileExt: string]: {
    handler: (file: MigrationFile) => Promise<MigrationResult>;
  };
};
