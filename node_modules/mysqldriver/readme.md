# MySQLDriver

## Sample usage

```javascript
const MySQLDriver = require('mysqldriver');
const config = {
  host: '127.0.0.1',
  user: 'admin',
  password: 'password',
  database: 'mydatabase',
  port: 3306,
};
const DB = MySQLDriver.connect(config);
const users = await DB.getRecords('user', { name: 'John Doe' }); // Gets all records who have name John Doe
```

## Setting up the test database

Execute the following statements

```sql
CREATE DATABASE mysqldriver_test;
CREATE USER 'testuser'@'%' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
GRANT ALL PRIVILEGES ON mysqldriver_test.* TO 'testuser'@'%';
FLUSH PRIVILEGES;
```

Create a configuration file `dbconfig.js`

```javascript
const config = {
  host: '127.0.0.1',
  database: 'mysqldriver_test',
  password: 'P@ssw0rd',
  user: 'testuser',
};
module.exports = config;
```

## Migrations

Create a new migration

```
DB_HOST=127.0.0.1 DB_DATABASE=mysqldriver_test DB_USERNAME=testuser DB_PASSWORD=P@ssw0rd mysqldriver create-migration --name createNewTable
```

Apply migrations

```
DB_HOST=127.0.0.1 DB_DATABASE=mysqldriver_test DB_USERNAME=testuser DB_PASSWORD=P@ssw0rd mysqldriver migrate --count 500
```

Rollback a migration

```
DB_HOST=127.0.0.1 DB_DATABASE=mysqldriver_test DB_USERNAME=testuser DB_PASSWORD=P@ssw0rd mysqldriver rollback --count 500
```

Migration options

```bash
DB_HOST= # The database host
DB_DATABASE= # The database to connect to
DB_USERNAME= #The database user's username
DB_PASSWORD= #The password for the database user
DB_PORT= #The port to connect to
DB_SSL_CA_CERTIFICATE # The base64 encoded string for the CA certificate
DB_REQUIRE_SSL= # Whether to enforce that the connection requires an ssl connection (1 or 0, defaults to 1 if cetificate is provided)
DB_SSL_ALLOW_SELF_SIGNED_CERT= # Whether self-signed certificates are allowed (1 or 0, defaults to 0)

```
