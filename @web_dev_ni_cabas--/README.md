# INSTALLATION

Commands in terminal:
### Tailwind CSS 
> `npm install -D tailwindcss postcss autoprefixer`
inside the taildwind.config.js, add this line: > `content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],`
inside *.css files add this lines:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
