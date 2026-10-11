// Generates every app icon / splash image from the crescent-moon mark.
// Run: npm run icons   (then `npx capacitor-assets generate --android` for Android)
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const BG = "#0e0f0d";
const FG = "#ece9e1";

/**
 * Crescent from favicon.svg (32-unit grid). `scale` = fraction of the canvas
 * the 32-unit mark occupies; `bg` = paint a full-bleed background or not.
 */
function svg(size, { scale = 1, bg = true, radius = 0 } = {}) {
  const s = (size * scale) / 32;
  const off = (size - 32 * s) / 2;
  const t = (x) => off + x * s;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${BG}"/>` : ""}
  <mask id="m"><rect width="${size}" height="${size}" fill="#000"/>
    <circle cx="${t(13.2)}" cy="${t(16)}" r="${9 * s}" fill="#fff"/>
    <circle cx="${t(18.2)}" cy="${t(15.2)}" r="${7.3 * s}" fill="#000"/></mask>
  <rect width="${size}" height="${size}" fill="${FG}" mask="url(#m)"/>
</svg>`);
}

async function png(file, size, opts) {
  await sharp(svg(size, opts)).png().toFile(file);
  console.log("✓", file);
}

mkdirSync("public/icons", { recursive: true });
mkdirSync("assets", { recursive: true });

// Web app / iPhone home screen
await png("public/icons/icon-192.png", 192, { scale: 1 });
await png("public/icons/icon-512.png", 512, { scale: 1 });
await png("public/icons/icon-maskable-512.png", 512, { scale: 0.8 });
await png("public/apple-touch-icon.png", 180, { scale: 0.95 });

// Android sources for @capacitor/assets
await png("assets/icon-only.png", 1024, { scale: 0.95 });
await png("assets/icon-foreground.png", 1024, { scale: 0.62, bg: false });
await sharp({ create: { width: 1024, height: 1024, channels: 3, background: BG } })
  .png()
  .toFile("assets/icon-background.png");
await png("assets/splash.png", 2732, { scale: 0.22 });
await png("assets/splash-dark.png", 2732, { scale: 0.22 });
