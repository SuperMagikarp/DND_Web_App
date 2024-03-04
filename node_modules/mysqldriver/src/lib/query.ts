import { DatabaseConfig } from '../interfaces/DatabaseConfig';
import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { DebugConfig } from '../interfaces/DebugConfig';
export const OPERATORS = {
  AND: 'AND',
  OR: 'OR',
};

export const ALLOWED_OPERATORS = {
  [OPERATORS.AND]: 1,
  [OPERATORS.OR]: 1,
};

const INVALID_COLUMN_NAME_CHARS = '!#%&’()*+,-./:;<=>?@[]^~ "`\\';
const INVALID_COLUMN_NAME_CHARS_INDEX = INVALID_COLUMN_NAME_CHARS.split(
  ''
).reduce((state: any, char: string) => {
  state[char] = 1;
  return state;
}, {});
/**
 * Query a connection with data
 * @param connection
 * @param query
 * @param values
 */
export const query = (config?: DatabaseConfig) =>
  async function (
    connection: DatabaseConnection,
    query: string,
    values: Array<any> = []
  ): Promise<any> {
    //Debugging
    const timeStart = new Date();
    let { isValid, errors } = checkValues(values);
    if (!isValid) {
      throw new Error(
        `Query error:\n${query}\n\nErrors:\n${errors.join('\n')}`
      );
    }
    let data = await new Promise((resolve, reject) => {
      connection.query(query, values, (err, resRaw) => {
        if (err) {
          reject(err);
        } else {
          let data = JSON.parse(JSON.stringify(resRaw));
          resolve(data);
        }
      });
    });
    const timeEnd = new Date();
    const timeTaken = (timeEnd.getTime() - timeStart.getTime()) / 1000;
    const debugInfo = {
      query: query,
      timeTaken,
    };
    if (config?.debug?.enabled) {
      config?.debug?.logger?.(
        `Executed query in ${debugInfo.timeTaken}s`,
        debugInfo
      );
    }
    return data;
  };

/**
 * Checks an array of values and ensures that it is not undefined
 * @param values
 */
function checkValues(values: Array<string>) {
  let errors: string[] = [];
  for (let idx in values) {
    let value = values[idx];
    if (value === undefined) {
      errors.push(`Prepared value at index ${idx} is undefined`);
    }
  }
  return { isValid: errors.length === 0, errors };
}

export function containsSpecialChars(str_val: string) {
  let found = false;
  for (let i = 0; i < str_val.length; i++) {
    let c = str_val[i];
    if (INVALID_COLUMN_NAME_CHARS_INDEX[c]) {
      found = true;
      break;
    }
  }
  return found;
}

export type QueryOptions = {
  limit?: QueryLimitOptions;
  where?: QueryWhereOptions;
};
export type QueryLimitOptions = {
  offset?: number;
  page_size: number;
};
export type QueryWhereOptions = {
  operator?: 'AND' | 'OR';
  wildcard?: boolean;
  wildcardBefore?: boolean;
  wildcardAfter?: boolean;
};
