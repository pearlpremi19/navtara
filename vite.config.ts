import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// `base: "./"` keeps every asset path relative, so the same build works inside
// the Android app bundle and on any static host (including a sub-path).
export default defineConfig({
  base: "./",
  resolve: { tsconfigPaths: true },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false, // registered manually in main.tsx (skipped in the Android app)
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        id: "com.jyotish.navtara",
        name: "Navtara",
        short_name: "Navtara",
        description:
          "Find your birth nakshatra, then map every lunar day into the nine taras of Navtara Padhati.",
        lang: "en-IN",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "portrait",
        background_color: "#0e0f0d",
        theme_color: "#0e0f0d",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            // Online city search — cache recent lookups for offline reuse.
            urlPattern: /^https:\/\/geocoding-api\.open-meteo\.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "geocoding",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
});
