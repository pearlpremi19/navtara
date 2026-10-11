import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";

/** Native-only polish for the Android app shell. */
export async function setupNative() {
  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: "#0e0f0d" });
  } catch {
    // Status bar plugin unavailable — not fatal.
  }
  await SplashScreen.hide();
}
