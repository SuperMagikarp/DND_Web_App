import applyMigration from '../../usecases/migrateUpgrade';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { MigrationProcessor } from '../../interfaces/MigrationProcessor';
import { MigrationFile } from '../../interfaces/MigrationFile';
import { MigrationAction } from '../../interfaces/MigrationAction';
import { connect } from '../../..';
import { DatabaseDriver } from '../../../classes/DatabaseDriver';
import { MigrationResult } from '../../interfaces/MigrationResult';
export class MigrationController {
  private processor: MigrationProcessor;
  private db: DatabaseDriver;
  constructor(db: DatabaseDriver, processor: MigrationProcessor) {
    this.processor = processor;
    this.db = db;
  }
  async upgrade(folderName: string, count: number = 1) {
    await applyMigration(
      this.db,
      this.processor,
      MigrationAction.Up,
      count,
      path.resolve(path.join(process.cwd(), folderName))
    );
  }

  async rollback(folderName: string, count: number = 1) {
    await applyMigration(
      this.db,
      this.processor,
      MigrationAction.Down,
      count,
      path.resolve(path.join(process.cwd(), folderName))
    );
  }
  /**
   * Create a set of migrations, with corresponding up and down actions
   * @param folderName
   * @param scriptName
   */
  async createMigration(folderName: string, scriptName: string) {
    let folderPath = path.resolve(path.join(process.cwd(), folderName));
    //Ensure that the folder exists
    let exists = await new Promise((resolve, reject) => {
      fs.exists(folderPath, (exists) => {
        resolve(exists);
      });
    });
    if (!exists) {
      await mkdirp(folderPath);
    }

    const timestamp = new Date().getTime();
    const name = `${timestamp}-${scriptName}`;
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(path.join(folderPath, `${name}.up.sql`), '', (err) => {
        err ? reject(err) : resolve();
      });
    });
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(path.join(folderPath, `${name}.down.sql`), '', (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}

export const createDefaultMigrationProcessor = async (
  db: DatabaseDriver
): Promise<MigrationProcessor> => {
  if (!(await db.tableExists('migrations'))) {
    await db.query(`CREATE TABLE \`migrations\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) NOT NULL,
      \`run_on\` datetime NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);
  }

  return {
    sql: {
      handler: async (
        migrationFile: MigrationFile
      ): Promise<MigrationResult> => {
        try {
          let query: string = await new Promise((resolve, reject) => {
            fs.readFile(migrationFile.filePath, (err, data) => {
              err ? reject(err) : resolve(data.toString());
            });
          });
          await db.query(query);
          return {
            success: true,
          };
        } catch (err) {
          console.error(err);
          return {
            success: false,
          };
        }
      },
    },
    js: {
      handler: async (
        migrationFile: MigrationFile
      ): Promise<MigrationResult> => {
        let migrate = require(migrationFile.filePath);
        try {
          await migrate(db);
          return { success: true };
        } catch (err) {
          console.error(err);
          return { success: false };
        }
      },
    },
  };
};
