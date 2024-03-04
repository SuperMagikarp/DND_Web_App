import { Action } from './interfaces/action';
import { ActionTypes } from './constants/actionTypes';
import {
  MigrationController,
  createDefaultMigrationProcessor,
} from './infrastructure/controllers/migration';
import { connect } from '..';
import { ConnectionConfig } from '../interfaces/ConnectionConfig';
export async function execute() {
  try {
    let args = process.argv;
    let [binPath, scriptPath, actionRaw, ...optionsRaw] = args;
    let action = processAction(actionRaw);
    let options = processOptions(optionsRaw);
    await performAction(action, options);
  } catch (err) {
    console.log(err);
  }
}
/**
 * Performance a set of actions in sequence
 * @param actions
 */
async function performAction(action: Action, options: ActionOptions) {
  let config: ConnectionConfig = {
    host: process.env['DB_HOST'],
    database: process.env['DB_DATABASE'],
    password: process.env['DB_PASSWORD'],
    user: process.env['DB_USERNAME'],
    multipleStatements: true,
  };
  let port = process.env['DB_PORT']
    ? parseInt(process.env['DB_PORT'])
    : undefined;
  if (port) {
    config.port = port;
  }
  let caCertContent = process.env['DB_SSL_CA_CERTIFICATE'];
  let defaultSslOption = caCertContent ? 1 : 0;
  let requireSsl = parseInt(`${process.env['DB_REQUIRE_SSL']}`)
    ? true
    : defaultSslOption;
  if (requireSsl && !caCertContent) {
    throw new Error('DB_SSL_CA_CERTIFICATE must be provided.');
  }
  if (caCertContent) {
    config.ssl = {
      ca: Buffer.from(caCertContent, 'base64').toString(),
    };

    let rejectUnauthorised = process.env['DB_SSL_ALLOW_SELF_SIGNED_CERT'];
    if (rejectUnauthorised) {
      let val = parseInt(rejectUnauthorised);
      if (val === 0) {
        config.ssl = {
          ...config.ssl,
          rejectUnauthorized: false,
        };
      }
    }
  }
  let db = connect(config);
  const defaultMigrationProcessor = await createDefaultMigrationProcessor(db);
  let controller = new MigrationController(db, defaultMigrationProcessor);
  switch (action.type) {
    case ActionTypes.Migrate: {
      let count =
        options.count !== null && options.count !== undefined
          ? options.count
          : 1;
      console.log(`Applying migrations with count: ${count}`);
      await controller.upgrade('/migrations', count);
      break;
    }
    case ActionTypes.Rollback: {
      let count =
        options.count !== null && options.count !== undefined
          ? options.count
          : 1;
      console.log(`Rolling back migrations with count: ${count}`);
      await controller.rollback('/migrations', count);
      break;
    }
    case ActionTypes.CreateMigration: {
      let defaultName = 'migration';
      const migrationName = options.name ? options.name : defaultName;
      await controller.createMigration('/migrations', migrationName);
      break;
    }
    default: {
      throw new InvalidActionTypeException(action.type);
    }
  }
}
/**
 * Prepare actions to be done based on options provided
 * @param action
 */
function processAction(action: string): Action {
  switch (action) {
    case 'migrate': {
      return { type: ActionTypes.Migrate, params: [] };
    }
    case 'rollback': {
      return { type: ActionTypes.Rollback, params: [] };
    }
    case 'create-migration': {
      return { type: ActionTypes.CreateMigration, params: [] };
    }
    default: {
      throw new InvalidActionException(action);
    }
  }
}
/**
 * Prepare actions to be done based on options provided
 * @param cliOptions
 */
function processOptions(cliOptions: string[]): ActionOptions {
  let config: ActionOptions = {};
  for (let i = 0; i < cliOptions.length; i++) {
    let opt = cliOptions[i];
    switch (opt) {
      case Options.Count: {
        let count = parseInt(cliOptions[i + 1]);
        if (Number.isNaN(count)) {
          throw new Error('Invalid count provided: ' + count);
        }
        config.count = count;
        i = i + 1; //Fast forward by 1
        break;
      }
      case Options.Name: {
        const name = cliOptions[i + 1];
        config.name = name;
        i = i + 1;
        break;
      }
      default: {
        throw new InvalidOptionException(opt);
      }
    }
  }
  return config;
}

class InvalidActionException extends Error {
  constructor(action: string) {
    super(`Invalid action ${action}`);
  }
}
class InvalidOptionException extends Error {
  constructor(option: string) {
    super(`Invalid option ${option}`);
  }
}
class InvalidActionTypeException extends Error {
  constructor(actionType: string) {
    super(`Invalid action type ${actionType}`);
  }
}

enum Options {
  Count = '--count', //Number of times to use the action
  Name = '--name', //Name of any files to be created
}

interface ActionOptions {
  count?: number;
  name?: string;
}
