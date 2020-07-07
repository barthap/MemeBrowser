import * as SQLite from 'expo-sqlite';


export interface ResultSet<T> {
    insertId: number | undefined;
    rowsAffected: number;
    rows: {
        length: number;
        item(index: number): T,
        _array: T[]
    }
}

export interface ITransaction {
    query<T>(sql: string, params?: any[]): Promise<ResultSet<T>>;
    exec(sql: string, params?: any[]): void;
}
export interface TransactionCallback<T> {
    (tx: ITransaction): Promise<T>;
}
export interface ISQLiteDatabase {
    transaction<T>(callback: TransactionCallback<T>): Promise<T>;
}

class SQLiteTransaction implements ITransaction {
    private transaction: SQLite.SQLTransaction;

    constructor(transaction: SQLite.SQLTransaction) {
        this.transaction = transaction;
    }

    query<T>(sql: string, params?: any[]): Promise<ResultSet<T>> {
        console.log(sql);
        return new Promise((resolve, reject) => {
            this.transaction.executeSql(sql, params, (tx, row) => {
                console.log('Finished', sql);
                // @ts-ignore
                resolve(row);
            }, (tx, err) => {
                if(err.code == 0) return true;

                console.error('Error when executing ' + sql, err);
                reject(err);
                return false;
            })
        });
    }

    exec(sql: string, params?: any[]): void {
        this.transaction.executeSql(sql, params, ()=>{}, (_, err) => {
            if(err.message !== 'Error code 0: not an error') {
                console.warn('Error when executing', sql);
                throw err;
            }
            return false;
        })
    }
}

class SQLiteDatabase implements ISQLiteDatabase {
    private readonly db: SQLite.Database;

    constructor(name: string) {
        this.db = SQLite.openDatabase(name);
    }

    public transaction<T>(callback: TransactionCallback<T>): Promise<T> {
        return new Promise( (resolve, reject) => {
            this.db.transaction(tx => {
                const tr = new SQLiteTransaction(tx);
                resolve(callback(tr));
            }, err => {
                if(err.code == 0) return true;

                reject(err);
                return false;
            })
        });
    }
}

export function openDatabase(name: string) {
    return new SQLiteDatabase(name);
}