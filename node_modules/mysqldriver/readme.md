# MySQLDriver
## Sample usage
``` Javascript
const MySQLDriver = require('mysqldriver');
const config = {
    host: '127.0.0.1',
    user: 'admin',
    password: 'password',
    database: 'mydatabase',
    port: 3306
}
const DB = new MySQLDriver(config);
const users = await DB.getRecords('user', { name: 'John Doe' }); // Gets all records who have name John Doe
```

## Model Generation
Executing this code within the root folder of your project will models in the folder specified in outfolder from the database specified in the configuration
```
npx mysqldriver-generate-model conf=./config/dbconfig.js outfolder=./references/db_objects
```

Example generated class:
``` javascript
class user {
    /**
     * @param {{created_date?:any,deleted?:any,displayname?:any,email?:any,fullname?:any,id?:any,idnumber?:any,password?:any,suspended?:any,updated_date?:any,username?:any}} db_objects
     */
    constructor(db_objects){
        this.created_date = db_objects.created_date;
        this.deleted = db_objects.deleted;
        this.displayname = db_objects.displayname;
        this.email = db_objects.email;
        this.fullname = db_objects.fullname;
        this.id = db_objects.id;
        this.idnumber = db_objects.idnumber;
        this.password = db_objects.password;
        this.suspended = db_objects.suspended;
        this.updated_date = db_objects.updated_date;
        this.username = db_objects.username;
    }
    validate(db_fields) {
        var properties = Object.keys(this)
        if(db_fields.length !== properties.length) {
            console.log('db_fields:');
            console.log(db_fields);
            console.log('properties:');
            console.log(properties);
            throw new Error(`user.validate: Validate error: Field lengths do not match.`)
        }
        for(var i in db_fields) {
            var property_index = properties.indexOf(db_fields[i])
            if(property_index === -1) {
                throw new Error(`user.validate: Validate_error: ${db_fields[i]} not found in db.`)
            }
            else {
                properties.splice(property_index, 1); //Remove the properties. All properties should be removed if validation passes
            }
        }
        if(properties.length > 0) {
            console.log(`user.validate: Missing properties in DB:`);
            console.log(properties);
            throw new Error(`user.validate: Property mismatch`);
        }
    }
    getTableName() {
        return 'user';
    }
}
module.exports = user;
```