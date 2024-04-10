import { Database } from "sqlite3";
import type { User } from "../types/user";

const DB_SOURCE = 'db.sqlite3';

export class DatabaseConnection {
  db: Database;
  
  constructor(){    
    // DB opening options:
    // OPEN_READWRITE (=default), OPEN_READONLY, OPEN_CREATE
    this.db = new Database(DB_SOURCE, (err) => {
      if (err){
        return console.error(err.message);
      }
      console.log("Connected to database");
    });
  }
  
  closeConnection(){
    this.db.close((err) => {
      if(err){
        console.error(err.message);
      }
      console.log("Closed the database connection");
    });    
  }
  
  get() : any {
    this.db.serialize(() => {
      this.db.each(
        'SELECT * FROM User', (err, user: User) => {
          if(err){
            console.log(err.message);
          }
          console.log(`User: ${user}`);
          console.log(user.id + '\t' + user.email, user.name, user.password);
          return user;
        }
      );
    });
    
  }
}