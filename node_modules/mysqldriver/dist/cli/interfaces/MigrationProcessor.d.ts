import { MigrationResult } from './MigrationResult';
import { MigrationFile } from '../interfaces/MigrationFile';
/**
 * A map of file extensions to the respective handlers.
 */
export declare type MigrationProcessor = {
    [fileExt: string]: {
        handler: (file: MigrationFile) => Promise<MigrationResult>;
    };
};
//# sourceMappingURL=MigrationProcessor.d.ts.map