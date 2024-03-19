import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});

// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     headers: {
//       "Cache-Control": "public, max-age=31536000", // Cache for one year (in seconds)
//     },
//   },
// });
