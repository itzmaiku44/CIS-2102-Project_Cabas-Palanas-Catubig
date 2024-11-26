cd server folder

// to setup the server folder

1. set up server folder 
    npm install
    npm install express
    npm install bcrypt
    npm install express-validator


2. set up prisma
    npm install prisma --save-dev
    npx prisma init
    npx prisma migrate dev --name <migration_name> //migrate the schema // only use this if editing the schema
    ------------ 
    npm install @prisma/cli --save-dev //
    npx prisma generate
    npx prisma migrate deploy
