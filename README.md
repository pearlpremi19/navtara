# Navtara

Find your birth nakshatra from date, time and place, then map every lunar day into the
nine taras of Navtara Padhati.

Everything is calculated on the device — no accounts, no servers, no ads, no cost.
The only network call is the optional online city search (free Open-Meteo geocoding);
a built-in city list works offline.

- **Android:** native app (`com.jyotish.navtara`), built with Capacitor.
- **iPhone / iPad:** installable web app (“Add to Home Screen”), works offline.

---

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
```

## Android APK

Requirements: JDK 21 (`brew install openjdk@21`) and the Android SDK.

```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
export ANDROID_HOME=$HOME/Library/Android/sdk
npm run android:apk
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

Share that file (Drive, email, GitHub Releases…). On the phone, open it and allow
“Install unknown apps” for the browser/files app when prompted.

> **Signing key:** `android/navtara-release.keystore` + `android/keystore.properties`.
> Back both up somewhere safe. Every future update must be signed with the same key,
> otherwise phones refuse to install it over the old version. Never commit them.

Optional: `cd android && ./gradlew bundleRelease` produces an `.aab` for Google Play
($25 one-time developer fee).

## iPhone (free) — host the web app via GitHub Pages

We included an automatic GitHub Pages deployment workflow in `.github/workflows/deploy.yml`.

### Step 1: Push project to GitHub

Run in your terminal:
```bash
git init -b main
git add .
git commit -m "Initial commit: Navtara standalone app"
gh repo create navtara --public --source=. --remote=origin --push
```

### Step 2: Enable GitHub Pages in your repository settings

1. Go to your repo on GitHub: `https://github.com/<your-username>/navtara/settings/pages`
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow manually in the **Actions** tab).
4. GitHub Pages will publish your site to:
   `https://<your-username>.github.io/navtara/`

### Step 3: Install on iPhone
1. Open your GitHub Pages link in **Safari** on the iPhone.
2. Tap the **Share** button (square with arrow pointing up).
3. Tap **Add to Home Screen**, then tap **Add**.
4. The app opens full-screen like a native app and works offline.

## Regenerate icons

```bash
npm run icons
npx capacitor-assets generate --android
```
