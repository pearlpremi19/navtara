import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jyotish.navtara",
  appName: "Navtara",
  webDir: "dist",
  backgroundColor: "#0e0f0d",
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#0e0f0d",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0e0f0d",
      overlaysWebView: false,
    },
  },
};

export default config;
