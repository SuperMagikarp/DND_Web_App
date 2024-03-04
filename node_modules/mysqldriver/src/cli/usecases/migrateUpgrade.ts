import fs from 'fs';
import path from 'path';
import { MigrationProcessor } from '../interfaces/MigrationProcessor';
import { MigrationFileExtensions } from '../interfaces/MigrationFileExtensions';
import { MigrationFile } from '../interfaces/MigrationFile';
import { MigrationFileTypes } from '../interfaces/MigrationFileTypes';
import { MigrationAction } from '../interfaces/MigrationAction';
import { DatabaseDriver } from '../../classes/DatabaseDriver';
import { ActionTypes } from '../constants/actionTypes';
export default async function (
  db: DatabaseDriver,
  processor: MigrationProcessor,
  action: MigrationAction,
  count: number,
  migrationPath: string
) {
  //Check if the migrations folder exists
  let info: fs.Stats = await new Promise((resolve, reject) => {
    fs.lstat(migrationPath, (err, stat) => {
      err ? reject(err) : resolve(stat);
    });
  });
  if (info.isDirectory()) {
    await migrate(db, processor, action, count, migrationPath);
  } else {
    throw new NotDirectoryException(migrationPath);
  }
}
/**
 * Perform migrations for path
 * @param migrationPath
 */
async function migrate(
  db: DatabaseDriver,
  processor: MigrationProcessor,
  action: MigrationAction,
  count: number,
  migrationPath: string
) {
  //Fetch migrations from database
  let appliedMigrations = await db.getRecords('migrations', {});
  let appliedMigrationIndex = appliedMigrations.reduce((state, migration) => {
    state[migration.name] = migration;
    return state;
  }, {});
  //Fetch migration files from folder
  let files: string[] = await new Promise((resolve, reject) => {
    fs.readdir(migrationPath, { encoding: 'utf-8' }, (err, paths: string[]) => {
      err ? reject(err) : resolve(paths);
    });
  });
  //Create the migration files based on the filenames in the migrations folder
  let migrationsRaw = files.map((fileName) =>
    parseFilepath(path.resolve(path.join(migrationPath, fileName)))
  );

  //Remove null values from migration files
  let migrations: MigrationFile[] = [];
  for (let migrationRaw of migrationsRaw) {
    if (migrationRaw !== null) {
      migrations.push(migrationRaw);
    }
  }
  //Filter by correct action types
  migrations = migrations.filter((m) => m.action === action);

  //Check to ensure that no duplicate migrations are created
  migrations.reduce((state, migration) => {
    if (state[migration.name]) {
      let existingMigration = state[migration.name];
      throw new DuplicateMigrationNameError(existingMigration);
    }
    state[migration.name] = migration;
    return state;
  }, {});

  //Filter out based on action type
  switch (action) {
    case MigrationAction.Up: {
      migrations = migrations.filter((migration) => {
        if (appliedMigrationIndex[migration.name]) {
          //if we have applied this migration before, skip
          return false;
        }
        return true;
      });
      break;
    }
    case MigrationAction.Down: {
      migrations = migrations.filter((migration) => {
        if (!appliedMigrationIndex[migration.name]) {
          //if we have not applied this migration before, skip
          return false;
        }
        return true;
      });
      break;
    }
  }

  //Sort migrations sequence to be applied
  switch (action) {
    case MigrationAction.Up: {
      //Sort migrations by created date ASC for upgrades
      migrations = migrations.sort((a, b) => {
        if (a.fileName < b.fileName) {
          return -1;
        } else if (a.fileName > b.fileName) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    }
    case MigrationAction.Down: {
      //Sort migrations by created date DESC for upgrades
      migrations = migrations.sort((a, b) => {
        if (a.fileName < b.fileName) {
          return 1;
        } else if (a.fileName > b.fileName) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    }
  }
  //Apply migrations
  for (let i = 0; i < count; i++) {
    if (i >= migrations.length) {
      break;
    }
    let migration = migrations[i];
    let { ext } = migration;
    let config = processor[ext];
    if (!config) {
      throw new UnsupportedFileExtensionProcessorException(ext);
    } else {
      let result = await config.handler(migration);
      if (!result.success) {
        console.log(
          `[⨯] Failed to apply migration ${migration.name} with action ${migration.action}`
        );
        throw new MigrationFailedError(migration);
      } else {
        switch (migration.action) {
          case MigrationAction.Up: {
            await db.insertRecord('migrations', {
              name: migration.name,
              run_on: new Date(),
            });
            console.log(
              `[✔️] Applied migration ${migration.name} (${migration.ext}) with action ${migration.action}`
            );
            break;
          }
          case MigrationAction.Down: {
            await db.deleteRecords('migrations', {
              name: migration.name,
            });
            console.log(
              `[✔️] Rolled back migration ${migration.name} (${migration.ext}) with action ${migration.action}`
            );
            break;
          }
        }
      }
    }
  }
}

export function parseFilepath(filePath: string): MigrationFile | null {
  let filenamePattern = /([0-9]+)-([A-z0-9]+)\.(down|up)\.(sql|js)/g;
  let matchesRaw = filenamePattern.exec(filePath);
  if (matchesRaw !== null) {
    let matches = Array.from(matchesRaw);
    let [fileName, timestamp, scriptName, actionRaw, extension] = matches;
    let type = getFileTypeFromExt(extension);
    let action = getActionFromActionRaw(actionRaw);
    let ext = getExtensionFromExtensionRaw(extension);
    let name = `${timestamp}-${scriptName}`;
    return {
      name,
      filePath,
      type,
      action,
      fileName,
      createdTime: parseInt(timestamp),
      scriptName,
      ext,
    };
  }
  return null;
}

/**
 * Get the valid file type from a file extension
 * @param ext
 */
function getFileTypeFromExt(ext: string): MigrationFileTypes {
  switch (ext) {
    case MigrationFileExtensions.SQL: {
      return MigrationFileTypes.SQL;
    }
    case MigrationFileExtensions.JS: {
      return MigrationFileTypes.JS;
    }
    default: {
      throw new UnsupportedFileExtensionException(ext);
    }
  }
}

function getActionFromActionRaw(actionRaw: string): MigrationAction {
  switch (actionRaw) {
    case MigrationAction.Up: {
      return MigrationAction.Up;
    }
    case MigrationAction.Down: {
      return MigrationAction.Down;
    }
    default: {
      throw new UnsupportedMigrationAction(actionRaw);
    }
  }
}

function getExtensionFromExtensionRaw(extRaw: string): MigrationFileExtensions {
  switch (extRaw) {
    case MigrationFileExtensions.SQL: {
      return MigrationFileExtensions.SQL;
    }
    case MigrationFileExtensions.JS: {
      return MigrationFileExtensions.JS;
    }
    default: {
      throw new UnsupportedFileExtensionException(extRaw);
    }
  }
}

class NotDirectoryException extends Error {
  constructor(migrationPath: string) {
    super(`Migration path is not a directory: ${migrationPath}`);
  }
}

class UnsupportedFileExtensionException extends Error {
  constructor(fileExt: string) {
    super(`Unsupported file extension: ${fileExt}`);
  }
}
class UnsupportedMigrationAction extends Error {
  constructor(action: string) {
    super(`Unsupported migration action: ${action}`);
  }
}
class UnsupportedFileExtensionProcessorException extends Error {
  constructor(fileExt: string) {
    super(`Unsupported file extenion: ${fileExt} `);
  }
}

class MigrationFailedError extends Error {
  migrationFile: MigrationFile;
  constructor(migrationFile: MigrationFile) {
    super(`Migration ${migrationFile.fileName} failed to process`);
    this.migrationFile = migrationFile;
  }
}

class DuplicateMigrationNameError extends Error {
  migrationFile: MigrationFile;
  constructor(migrationFile: MigrationFile) {
    super(`Duplicate migration found: ${migrationFile.fileName}`);
    this.migrationFile = migrationFile;
  }
}
