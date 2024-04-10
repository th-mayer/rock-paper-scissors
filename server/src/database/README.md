Our Database Setup

The following SQL Statements were used to setup our sqlite3 database:

```sql
CREATE TABLE User(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password CHAR(80) NOT NULL 
  );
```

```sql
CREATE TABLE Item(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  effect TEXT
);
```

```sql
CREATE TABLE User_Items(
  item_id INTEGER,
  user_id INTEGER,
  PRIMARY KEY (user_id, item_id),
  FOREIGN KEY (user_id)
    REFERENCES User (id),
  FOREIGN KEY (item_id)
    REFERENCES Item (id)
);
```

```sql
INSERT INTO User(email, name, password) VALUES('example@example.com', 'John Doe', 'NotAPasswd');
´´´
