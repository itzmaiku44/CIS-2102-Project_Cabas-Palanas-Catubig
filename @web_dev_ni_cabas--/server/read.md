Step 1: Set Up the Server Folder
Navigate to the server folder:

cd server
Install dependencies:

npm install
Install necessary packages:

npm install express
npm install bcrypt
npm install express-validator
npm install cors

Step 2: Set Up Prisma
Install Prisma as a development dependency:

npm install prisma --save-dev
Initialize Prisma:

npx prisma init
If editing the schema, run the following to migrate the schema:

npx prisma migrate dev --name <migration_name>
Generate Prisma client:

npx prisma generate
Deploy the migrations or start Prisma Studio:

To deploy migrations:
npx prisma migrate deploy
To open Prisma Studio:
npx prisma studio
