import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/hhgoa/",
  tanstackStart: {
    server: { entry: "server" },
  },
});
