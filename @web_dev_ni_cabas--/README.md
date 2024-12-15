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
  `npm install @fortawesome/fontawesome-free`
- Add the CSS Import in \*.css file/s: `@import "@fortawesome/fontawesome-free/css/all.min.css";`
  css file should look like this:

```
@import "@fortawesome/fontawesome-free/css/all.min.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

# <<<<<<< HEAD

### prop-types

- validate the types of props passed to a component. used for login, register, edit profile, etc.
- Command in terminal

```
npm install prop-types
```

> > > > > > > fdf11c41b6219bf7463bc48d1e11fabb509117ae

### Routers

npm install react-router-dom

### State management

npm install zustand

### dummy account

user email: testuser@example.com
user password: TestPassword123

## Pie Chart

npm install chart.js react-chartjs-2

npm install lucide-react
