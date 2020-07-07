import * as SQLite from './SQLiteWrapper';

import schemaSQL from '../assets/db/schema.sql.json';
import exampleDataSQL from '../assets/db/data.sql.json';
import dropSchemaSQL from '../assets/db/dropSchema.sql.json';

class Database {
    private db: SQLite.ISQLiteDatabase;

    constructor() {
        console.log('Initializing database...');
        this.db = SQLite.openDatabase('app');
       // this.reset();
        this.executeJsonSql(schemaSQL);
    }

    public transaction<T>(callback: SQLite.TransactionCallback<T>): Promise<T> {
        return this.db.transaction(callback);
    }

    //rebuilds schema and inserts initial data
    public async reset() {
        console.log('Dropping schema...');
        await this.executeJsonSql(dropSchemaSQL);
        console.log('Creating new schema...');
        await this.executeJsonSql(schemaSQL);
        console.log('Pushing example data...');
        await this.executeJsonSql(exampleDataSQL);
    }

    private async executeJsonSql(json: string[]): Promise<any> {
        return this.db.transaction(async tx => {
            for(let stmt of json) {
                stmt += ';';
                tx.exec(stmt);
            }
        });

    }
    private async executeSql(sql: string): Promise<void> {
        const lines = sql.replace('\n', '').split(';');
        return this.executeJsonSql(lines);
    }
}

const db = new Database();

export default db;