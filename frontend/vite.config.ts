import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  resolve:{
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "main" : fileURLToPath(new URL("./src/css/main.scss", import.meta.url))
    }
  }
});
