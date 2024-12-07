import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@myorg/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@myorg/utils": path.resolve(__dirname, "../../packages/utils/src"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
