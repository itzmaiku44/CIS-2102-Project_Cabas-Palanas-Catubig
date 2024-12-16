# HOW TO RUN?
### Step 1:
Navigate the project folder in your desktop and Right click to any open space then click "Open in Code".</br>
![image](https://github.com/user-attachments/assets/a46c9314-9167-47c5-aab9-7a9b0ed272bb)

### Step 2:
Open terminal in VS Code.
- In your VS Code, click Terminal in top selection and click New terminal, </br>
![image](https://github.com/user-attachments/assets/d61b575c-a02d-4cdf-afcb-38bbe213af8c)

</br>

- After the new terminal shows up, Repeat the step 2 and Click the Split Terminal, </br>
![image](https://github.com/user-attachments/assets/46b675e5-1920-4501-9530-77d69cf60d5f)

### Step 3:
In your Terminal, Run this command to start the backend server.
- Open Server folder
```
cd server
```
- Start the "server.js"
```
node server.js
```
- Start the localhost for web
```
npm run dev
```
![image](https://github.com/user-attachments/assets/393d3cd0-5e7b-44bd-a58c-3f1b2f6e2fd5)


</br>
</br>

# INSTALLATION

### Tailwind CSS

- Command in terminal

```
npm install -D tailwindcss postcss autoprefixer
```

- inside the taildwind.config.js, add this line: `content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],`

```
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- inside \*.css files add this lines:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Create a new file in parent folder named "postcss.config.cjs" and add this code:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### FontAwesome ICONS

- Command in terminal

```
npm install @fortawesome/fontawesome-free
```

- Add the CSS Import in \*.css file/s: `@import "@fortawesome/fontawesome-free/css/all.min.css";`
  css file should look like this:

```
@import "@fortawesome/fontawesome-free/css/all.min.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

</br>
</br>
</br>

# PACKAGES

> > > > > > > c9b1a4fcd14d4d5570c206dee5786f2558808310

### prop-types

- validate the types of props passed to a component. used for login, register, edit profile, etc.
- Command in terminal

```
npm install prop-types
```

> > > > > > > fdf11c41b6219bf7463bc48d1e11fabb509117ae

### Routers

```
npm install react-router-dom
```

### State management

```
npm install zustand
```

### test dummy account

```
user email: testuser@example.com
user password: TestPassword123
```

## Pie Chart
```
npm install chart.js react-chartjs-2
```

## Sidebar
```
npm install lucide-react
```
</br>

# BACKEND SERVER 

### Step 1: Set Up the Server Folder
Navigate to the server folder:

cd server
Install dependencies:

npm install
Install necessary packages:
```
npm install express
npm install bcrypt
npm install express-validator
npm install cors
```
### Step 2: Set Up Prisma
Install Prisma as a development dependency:
```
npm install prisma --save-dev
```
Initialize Prisma:
```
npx prisma init
```
If editing the schema, run the following to migrate the schema:
```
npx prisma migrate dev --name <migration_name>
```
Generate Prisma client:
```
npx prisma generate
```
Deploy the migrations or start Prisma Studio:

To deploy migrations:
```
npx prisma migrate deploy
```
To open Prisma Studio:
```
npx prisma studio
```
