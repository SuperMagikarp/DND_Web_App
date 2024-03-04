import chai, { assert } from 'chai';
import * as MySQLDriverPackage from '../index';
import { makeTestConnectionConfig } from './utils/connection';
let TEST_DATA = getTestData();
let config = makeTestConnectionConfig();
describe('All Tests (serverless)', () => {
  let users = {};
  let db = MySQLDriverPackage.connect({
    ...config,
    autoClose: {
      intervalMs: 20,
    },
  });
  before(async () => {
    let sqls = [
      `CREATE TABLE \`user\` (
            \`user_id\` VARCHAR(50) NOT NULL DEFAULT '',
            \`first_name\` VARCHAR(255) DEFAULT NULL,
            \`last_name\` VARCHAR(255) DEFAULT NULL,
            \`email\` VARCHAR(255) DEFAULT NULL,
            \`index_number\` INT DEFAULT NULL,
            \`created_by\` VARCHAR(50) DEFAULT NULL,
            \`created_date\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_by\` VARCHAR(50) DEFAULT NULL,
            \`updated_date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

            PRIMARY KEY (\`user_id\`),
            INDEX \`IX_USE_use_id\` (\`user_id\`),
            INDEX \`IX_USE_fir_nam\` (\`first_name\`),
            INDEX \`IX_USE_las_nam\` (\`last_name\`),
            INDEX \`IX_USE_ema\` (\`email\`),
            INDEX \`IX_USE_ind_num\` (\`index_number\`)

            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    ];
    for (let sql of sqls) {
      await db.query(sql, []);
    }
  });
  after(async () => {
    let sqls = [`DROP TABLE user;`];
    for (let sql of sqls) {
      await db.query(sql, []);
    }
    await db.closeConnection();
  });
  it('Insert records', async () => {
    async function createUser(userData) {
      let user = {
        user_id: db.generateId(),
        ...userData,
      };
      await db.insertRecord('user', user);
      users[user.user_id] = user;
    }
    await createUser(TEST_DATA.USER_1);
    await createUser(TEST_DATA.USER_2);
  });
  //Get
  it('Get Records', async () => {
    let user: any = Object.values(users)[0];
    let record = await db.getRecords('user', {
      user_id: user.user_id,
      index_number: user.index_number,
    });
    chai.assert(record.length > 0, 'Failed to get records.');
  });
  it('Get Records Limit', async () => {
    let record = await db.getRecords('user', {}, undefined, {
      limit: { offset: 0, page_size: 1 },
    });
    chai.assert(record.length === 1, 'Failed to limit records.');
  });
  it('Get Records Order', async () => {
    let user: any = Object.values(users)[1];
    let records = await db.getRecords(
      'user',
      {},
      [{ key: 'index_number', order: 'DESC' }],
      { limit: { offset: 0, page_size: 1 } }
    );
    chai.assert(records[0].user_id === user.user_id, 'Failed to order records');
  });
  it('Get Records Order Wildcard (before)', async () => {
    let user: any = Object.values(users)[1];
    let user_id_partial = user.user_id.substring(1, user.user_id.length);
    let records = await db.getRecords(
      'user',
      { user_id: user_id_partial },
      [{ key: 'index_number', order: 'DESC' }],
      {
        limit: { offset: 0, page_size: 1 },
        where: { wildcardBefore: true },
      }
    );
    chai.assert(records[0] !== undefined, 'Failed to get user record');
    chai.assert(records[0].user_id === user.user_id, 'Failed to order records');
  });
  it('Get Records Order Wildcard (after)', async () => {
    let user: any = Object.values(users)[1];
    let user_id_partial = user.user_id.substring(0, user.user_id.length - 2);
    let records = await db.getRecords(
      'user',
      { user_id: user_id_partial },
      [{ key: 'index_number', order: 'DESC' }],
      {
        limit: { offset: 0, page_size: 1 },
        where: { wildcardAfter: true },
      }
    );
    chai.assert(records[0] !== undefined, 'Failed to get user record');
    chai.assert(records[0].user_id === user.user_id, 'Failed to order records');
  });
  it('Get Records Order Wildcard (before and after)', async () => {
    let user: any = Object.values(users)[1];
    let user_id_partial = user.user_id.substring(1, user.user_id.length - 2);
    let records = await db.getRecords(
      'user',
      { user_id: user_id_partial },
      [{ key: 'index_number', order: 'DESC' }],
      {
        limit: { offset: 0, page_size: 1 },
        where: { wildcard: true },
      }
    );
    chai.assert(records[0] !== undefined, 'Failed to get user record');
    chai.assert(records[0].user_id === user.user_id, 'Failed to order records');
  });
  it('Get Records (OR)', async () => {
    let user: any = Object.values(users)[0];
    let user_id_partial = user.user_id.substring(1, user.user_id.length - 2);
    let records = await db.getRecords(
      'user',
      { user_id: user_id_partial, index_number: 2 },
      [{ key: 'index_number', order: 'DESC' }],
      {
        limit: { offset: 0, page_size: 2 },
        where: { operator: 'OR', wildcard: true },
      }
    );
    chai.assert(
      records.length === 2,
      'Failed to get records with OR operator.'
    );
  });
  it('Get Records (AND)', async () => {
    let user: any = Object.values(users)[0];
    let user_id_partial = user.user_id.substring(1, user.user_id.length - 2);
    let records = await db.getRecords(
      'user',
      { user_id: user_id_partial, index_number: 2 },
      [{ key: 'index_number', order: 'DESC' }],
      {
        limit: { offset: 0, page_size: 2 },
        where: { operator: 'AND', wildcard: true },
      }
    );
    chai.assert(
      records.length === 0,
      'Failed to get records with AND operator.'
    );
  });

  //Count
  it('Get Records Count', async () => {
    let user: any = Object.values(users)[0];
    let count = await db.getRecordsCount('user', { user_id: user.user_id });
    chai.assert(count > 0, 'Failed to count records.');
  });
  it('Get Records Count Limit', async () => {
    let count = await db.getRecordsCount('user', {}, undefined, {
      limit: { offset: 0, page_size: 1 },
    });
    chai.assert(count === 1, 'Failed to limit records.');
  });
  it('Get Records Count Order', async () => {
    let count = await db.getRecordsCount(
      'user',
      {},
      [{ key: 'index_number', order: 'DESC' }],
      { limit: { offset: 0, page_size: 1 } }
    );
    chai.assert(count === 1, 'Failed to limit records.');
  });

  //Update
  it('Update Records', async () => {
    let user1: any = Object.values(users)[0];
    await db.updateRecords('user', TEST_DATA.USER_1_UPDATED, {
      user_id: user1.user_id,
    });
    user1 = {
      ...user1,
      ...TEST_DATA.USER_1_UPDATED,
    };
    users[user1.user_id] = user1;
    let user1_updated = await db.getRecord('user', { user_id: user1.user_id });
    chai.assert.equal(
      user1_updated.first_name,
      TEST_DATA.USER_1_UPDATED.first_name,
      'Failed to up update record.'
    );
    let user2: any = Object.values(users)[1];
    let user2_record = await db.getRecord('user', { user_id: user2.user_id });
    for (let key in user2) {
      chai.assert.strictEqual(
        user2[key],
        user2_record[key],
        'Unexpected record update.'
      );
    }
  });

  //Delete
  it('Delete Records', async () => {
    let user1: any = Object.values(users)[0];
    await db.deleteRecords('user', { user_id: user1.user_id });
    let found = await db.getRecords('user', { user_id: user1.user_id });
    assert.equal(found.length, 0, 'Failed to delete users');
  });
});

describe('Automatic reconnect', () => {
  let users = {};
  let db = MySQLDriverPackage.connect(config);
  let testData = getTestData();
  before(async () => {
    let sqls = [
      `CREATE TABLE \`user\` (
            \`user_id\` VARCHAR(50) NOT NULL DEFAULT '',
            \`first_name\` VARCHAR(255) DEFAULT NULL,
            \`last_name\` VARCHAR(255) DEFAULT NULL,
            \`email\` VARCHAR(255) DEFAULT NULL,
            \`index_number\` INT DEFAULT NULL,
            \`created_by\` VARCHAR(50) DEFAULT NULL,
            \`created_date\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_by\` VARCHAR(50) DEFAULT NULL,
            \`updated_date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

            PRIMARY KEY (\`user_id\`),
            INDEX \`IX_USE_use_id\` (\`user_id\`),
            INDEX \`IX_USE_fir_nam\` (\`first_name\`),
            INDEX \`IX_USE_las_nam\` (\`last_name\`),
            INDEX \`IX_USE_ema\` (\`email\`),
            INDEX \`IX_USE_ind_num\` (\`index_number\`)

            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    ];
    for (let sql of sqls) {
      await db.query(sql, []);
    }
    await db.insertRecord('user', testData.USER_1);
  });
  after(async () => {
    let sqls = [`DROP TABLE user;`];
    for (let sql of sqls) {
      await db.query(sql, []);
    }
    await db.closeConnection();
  });
  it('Can query after disconnect', async () => {
    db.closeConnection();
    let d = await db.getRecords('user', { email: testData.USER_1.email });
    assert(d[0].email === testData.USER_1.email, 'Failed to get correct data');
    assert(d.length > 0, 'Failed to get records');
  });
});

function getTestData() {
  return {
    USER_1: {
      first_name: 'test_user1',
      last_name: 'tu1ln',
      email: 'test_user1@localhost',
      index_number: 1,
    },
    USER_1_UPDATED: {
      first_name: 'test_user1_updated',
    },
    USER_2: {
      first_name: 'test_user2',
      last_name: 'tu2ln',
      email: 'test_user2@localhost',
      index_number: 2,
    },
  };
}
