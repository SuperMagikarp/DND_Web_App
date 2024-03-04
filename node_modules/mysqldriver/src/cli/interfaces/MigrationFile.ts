import { MigrationFileExtensions } from './MigrationFileExtensions';
import { MigrationFileTypes } from './MigrationFileTypes';
import { MigrationAction } from './MigrationAction';
export interface MigrationFile {
  name: string; //Includes timestamp and scriptName
  filePath: string; //Full path to the file
  ext: MigrationFileExtensions;
  type: MigrationFileTypes;
  action: MigrationAction;
  createdTime: number;
  scriptName: string; //Contains the intention of the script. e.g. createUserTable
  fileName: string;
}
