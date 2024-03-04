import { MigrationProcessor } from '../interfaces/MigrationProcessor';
import { MigrationFile } from '../interfaces/MigrationFile';
import { MigrationAction } from '../interfaces/MigrationAction';
import { DatabaseDriver } from '../../classes/DatabaseDriver';
export default function (db: DatabaseDriver, processor: MigrationProcessor, action: MigrationAction, count: number, migrationPath: string): Promise<void>;
export declare function parseFilepath(filePath: string): MigrationFile | null;
//# sourceMappingURL=migrateUpgrade.d.ts.map