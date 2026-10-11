import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import "@fontsource-variable/figtree/wght.css";
import "@fontsource-variable/figtree/wght-italic.css";
import "@fontsource-variable/newsreader/opsz.css";
import "./styles.css";
import { App } from "./App";
import { ErrorBoundary } from "@/lib/error-component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

if (Capacitor.isNativePlatform()) {
  // Native Android shell: assets are already bundled, so no service worker.
  void import("./native").then((m) => m.setupNative());
} else if (import.meta.env.PROD) {
  // Installable web app (iPhone "Add to Home Screen"): cache everything for offline use.
  void import("virtual:pwa-register").then(({ registerSW }) => registerSW({ immediate: true }));
}
