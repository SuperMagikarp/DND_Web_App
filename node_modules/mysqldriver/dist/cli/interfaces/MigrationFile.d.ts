import { MigrationFileExtensions } from './MigrationFileExtensions';
import { MigrationFileTypes } from './MigrationFileTypes';
import { MigrationAction } from './MigrationAction';
export interface MigrationFile {
    name: string;
    filePath: string;
    ext: MigrationFileExtensions;
    type: MigrationFileTypes;
    action: MigrationAction;
    createdTime: number;
    scriptName: string;
    fileName: string;
}
//# sourceMappingURL=MigrationFile.d.ts.map