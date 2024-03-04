import { parseFilepath } from './migrateUpgrade';
import { MigrationFile } from '../interfaces/MigrationFile';
import { MigrationFileTypes } from '../interfaces/MigrationFileTypes';
import { MigrationAction } from '../interfaces/MigrationAction';
import { expect } from 'chai';
import { MigrationFileExtensions } from '../interfaces/MigrationFileExtensions';

describe('Migrate Upgrade Usecase', () => {
  it('Parse Filepath (SQL, up)', () => {
    const createdTime = 1598155575896;
    const scriptName = 'createUserTable';
    const actionRaw = 'up';
    const ext = 'sql';
    const name = `${createdTime}-${scriptName}`;
    const fileName = `${name}.${actionRaw}.${ext}`;
    let filePath = createTestPath(fileName);
    let expected: MigrationFile = {
      name,
      filePath,
      type: MigrationFileTypes.SQL,
      action: MigrationAction.Up,
      createdTime,
      fileName,
      scriptName,
      ext: MigrationFileExtensions.SQL,
    };
    let actual = parseFilepath(filePath);
    let keys = Object.keys(expected);
    if (actual !== null) {
      for (let key in keys) {
        expect(actual[key]).to.be.equal(
          expected[key],
          `${key} values are not equal`
        );
      }
    } else {
      expect(actual).not.equal(null, `Migration file cannot be null`);
    }
  });
  it('Parse Filepath (SQL, down)', () => {
    const createdTime = 1598155575896;
    const scriptName = 'createUserTable';
    const actionRaw = 'down';
    const ext = 'sql';
    const name = `${createdTime}-${scriptName}`;
    const fileName = `${name}.${actionRaw}.${ext}`;
    let filePath = createTestPath(fileName);
    let expected: MigrationFile = {
      name,
      filePath,
      type: MigrationFileTypes.SQL,
      action: MigrationAction.Down,
      createdTime,
      fileName,
      scriptName,
      ext: MigrationFileExtensions.SQL,
    };
    let actual = parseFilepath(filePath);
    let keys = Object.keys(expected);
    if (actual !== null) {
      for (let key in keys) {
        expect(actual[key]).to.be.equal(
          expected[key],
          `${key} values are not equal`
        );
      }
    } else {
      expect(actual).not.equal(null, `Migration file cannot be null`);
    }
  });
});

function createTestPath(fileName) {
  return `path/to/dir/${fileName}`;
}
