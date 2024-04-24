import { Database } from "sqlite3";
import type { User } from "../types/User";
import { create } from "domain";
import { Item } from "../types/Item";
import { UserItems } from "../types/UserItems";

const DB_SOURCE = "db.sqlite3";

export class DatabaseConnection {
  db: Database;

  constructor() {
    // DB opening options:
    // OPEN_READWRITE (=default), OPEN_READONLY, OPEN_CREATE
    this.db = new Database(DB_SOURCE, (err: any) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to database");
    });
  }

  closeConnection() {
    this.db.close((err: any) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Closed the database connection");
    });
  }

  get(query: string): any {
    this.db.serialize(() => {
      this.db.each(query, (err: any, db_obj: User | Item | UserItems) => {
        if (err) {
          console.log('DB Get Error: ' + err.message);
        }
        return db_obj;
      });
    });
  }

  /**
   * 
   * @param query ex. 'INSERT INTO table(param1, param2)
   * @param values Parameters to be added into the row, Need to be defined as an array like so: foo: (number|string)[] = [1, "name"];
   */
  create(query: string, values: any[] ): void {
    this.db.serialize(() => {
      this.db.run(query, values, (err) => {
        if (err) {
          console.log('DB Create Error: ' + err.message + '\nSQL Statement: ' + query);
        }
        console.log(`Inserted ${values}`);
      });
    });
  }
}
