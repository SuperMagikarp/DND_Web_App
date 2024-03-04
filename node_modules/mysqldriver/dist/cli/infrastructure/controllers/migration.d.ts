import { MigrationProcessor } from '../../interfaces/MigrationProcessor';
import { DatabaseDriver } from '../../../classes/DatabaseDriver';
export declare class MigrationController {
    private processor;
    private db;
    constructor(db: DatabaseDriver, processor: MigrationProcessor);
    upgrade(folderName: string, count?: number): Promise<void>;
    rollback(folderName: string, count?: number): Promise<void>;
    /**
     * Create a set of migrations, with corresponding up and down actions
     * @param folderName
     * @param scriptName
     */
    createMigration(folderName: string, scriptName: string): Promise<void>;
}
export declare const createDefaultMigrationProcessor: (db: DatabaseDriver) => Promise<MigrationProcessor>;
//# sourceMappingURL=migration.d.ts.map