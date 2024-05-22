/*
  Warnings:

  - You are about to drop the `UserItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserItem";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modifier" REAL NOT NULL,
    "kind" INTEGER NOT NULL DEFAULT 99,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "kind", "modifier") SELECT "id", "kind", "modifier" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
