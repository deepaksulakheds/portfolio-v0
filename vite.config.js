import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default ({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return defineConfig({
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || "/",
    server: {
      open: true,
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
      },
    },
  });
};
