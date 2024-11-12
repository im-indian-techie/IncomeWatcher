import { DEBUG, enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";


DEBUG(true)
enablePromise(true)

export const getDbConnection = async () => {
    return openDatabase({ name: 'IncomeWatcher.db', location: 'default' })
};

export const createTable = async (db:SQLiteDatabase) => {
    const QUERY = `CREATE TABLE IF NOT EXISTS INCOME (id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT NOT NULL,date TEXT NOT NULL,amount INTEGER NOT NULL );`;
    await db.executeSql(QUERY);
}

