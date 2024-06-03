# Rock Paper Scissors Server

To run this project you need a ``.env`` file at the root of this project.
This file needs to contain the following variables:
``
DATABASE_URL="file:./dev.db"
PORT
CLIENT_URL
``

Of these, you can modify the port and client url to your wishes. During developement, the values used are: ``PORT=3000``, ``CLIENT_URL="http://localhost:5173"``.

The database url should only be adjusted if you know what you're doing! For further info, see the README.md file in server/prisma.
