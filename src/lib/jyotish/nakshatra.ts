export const NAKSHATRA_SPAN = 360 / 27;
export const PADA_SPAN = NAKSHATRA_SPAN / 4;

export type Nakshatra = {
  index: number;
  name: string;
  short: string;
  iast: string;
  devanagari: string;
  lord: string;
  deity: string;
  symbol: string;
};

export const NAKSHATRAS: Nakshatra[] = [
  { index: 0, name: "Ashwini", short: "Ash", iast: "Aśvinī", devanagari: "अश्विनी", lord: "Ketu", deity: "Ashwini Kumaras", symbol: "Horse head" },
  { index: 1, name: "Bharani", short: "Bha", iast: "Bharaṇī", devanagari: "भरणी", lord: "Venus", deity: "Yama", symbol: "Yoni" },
  { index: 2, name: "Krittika", short: "Kri", iast: "Kṛttikā", devanagari: "कृत्तिका", lord: "Sun", deity: "Agni", symbol: "Razor" },
  { index: 3, name: "Rohini", short: "Roh", iast: "Rohiṇī", devanagari: "रोहिणी", lord: "Moon", deity: "Brahma", symbol: "Cart" },
  { index: 4, name: "Mrigashira", short: "Mrg", iast: "Mṛgaśīrṣa", devanagari: "मृगशीर्ष", lord: "Mars", deity: "Soma", symbol: "Deer head" },
  { index: 5, name: "Ardra", short: "Ard", iast: "Ārdrā", devanagari: "आर्द्रा", lord: "Rahu", deity: "Rudra", symbol: "Teardrop" },
  { index: 6, name: "Punarvasu", short: "Pun", iast: "Punarvasu", devanagari: "पुनर्वसु", lord: "Jupiter", deity: "Aditi", symbol: "Quiver" },
  { index: 7, name: "Pushya", short: "Pus", iast: "Puṣya", devanagari: "पुष्य", lord: "Saturn", deity: "Brihaspati", symbol: "Lotus" },
  { index: 8, name: "Ashlesha", short: "Asl", iast: "Āśleṣā", devanagari: "आश्लेषा", lord: "Mercury", deity: "Nagas", symbol: "Serpent" },
  { index: 9, name: "Magha", short: "Mag", iast: "Maghā", devanagari: "मघा", lord: "Ketu", deity: "Pitris", symbol: "Throne" },
  { index: 10, name: "Purva Phalguni", short: "PPh", iast: "Pūrva Phalgunī", devanagari: "पूर्व फाल्गुनी", lord: "Venus", deity: "Bhaga", symbol: "Hammock" },
  { index: 11, name: "Uttara Phalguni", short: "UPh", iast: "Uttara Phalgunī", devanagari: "उत्तर फाल्गुनी", lord: "Sun", deity: "Aryaman", symbol: "Bed" },
  { index: 12, name: "Hasta", short: "Has", iast: "Hasta", devanagari: "हस्त", lord: "Moon", deity: "Savitar", symbol: "Hand" },
  { index: 13, name: "Chitra", short: "Chi", iast: "Citrā", devanagari: "चित्रा", lord: "Mars", deity: "Tvashtar", symbol: "Pearl" },
  { index: 14, name: "Swati", short: "Swa", iast: "Svātī", devanagari: "स्वाती", lord: "Rahu", deity: "Vayu", symbol: "Shoot" },
  { index: 15, name: "Vishakha", short: "Vis", iast: "Viśākhā", devanagari: "विशाखा", lord: "Jupiter", deity: "Indra-Agni", symbol: "Archway" },
  { index: 16, name: "Anuradha", short: "Anu", iast: "Anurādhā", devanagari: "अनुराधा", lord: "Saturn", deity: "Mitra", symbol: "Lotus" },
  { index: 17, name: "Jyeshtha", short: "Jye", iast: "Jyeṣṭhā", devanagari: "ज्येष्ठा", lord: "Mercury", deity: "Indra", symbol: "Umbrella" },
  { index: 18, name: "Mula", short: "Mul", iast: "Mūla", devanagari: "मूल", lord: "Ketu", deity: "Nirriti", symbol: "Roots" },
  { index: 19, name: "Purva Ashadha", short: "PAs", iast: "Pūrva Āṣāḍhā", devanagari: "पूर्वाषाढ़ा", lord: "Venus", deity: "Apas", symbol: "Fan" },
  { index: 20, name: "Uttara Ashadha", short: "UAs", iast: "Uttara Āṣāḍhā", devanagari: "उत्तराषाढ़ा", lord: "Sun", deity: "Vishvedevas", symbol: "Tusk" },
  { index: 21, name: "Shravana", short: "Shr", iast: "Śravaṇa", devanagari: "श्रवण", lord: "Moon", deity: "Vishnu", symbol: "Ear" },
  { index: 22, name: "Dhanishta", short: "Dha", iast: "Dhaniṣṭhā", devanagari: "धनिष्ठा", lord: "Mars", deity: "Eight Vasus", symbol: "Drum" },
  { index: 23, name: "Shatabhisha", short: "Sat", iast: "Śatabhiṣā", devanagari: "शतभिषा", lord: "Rahu", deity: "Varuna", symbol: "Circle" },
  { index: 24, name: "Purva Bhadrapada", short: "PBh", iast: "Pūrva Bhādrapadā", devanagari: "पूर्व भाद्रपदा", lord: "Jupiter", deity: "Aja Ekapada", symbol: "Sword" },
  { index: 25, name: "Uttara Bhadrapada", short: "UBh", iast: "Uttara Bhādrapadā", devanagari: "उत्तर भाद्रपदा", lord: "Saturn", deity: "Ahir Budhnya", symbol: "Twins" },
  { index: 26, name: "Revati", short: "Rev", iast: "Revatī", devanagari: "रेवती", lord: "Mercury", deity: "Pushan", symbol: "Fish" },
];

export type Rashi = {
  index: number;
  name: string;
  iast: string;
  devanagari: string;
  lord: string;
};

export const RASHIS: Rashi[] = [
  { index: 0, name: "Aries", iast: "Meṣa", devanagari: "मेष", lord: "Mars" },
  { index: 1, name: "Taurus", iast: "Vṛṣabha", devanagari: "वृषभ", lord: "Venus" },
  { index: 2, name: "Gemini", iast: "Mithuna", devanagari: "मिथुन", lord: "Mercury" },
  { index: 3, name: "Cancer", iast: "Karka", devanagari: "कर्क", lord: "Moon" },
  { index: 4, name: "Leo", iast: "Siṃha", devanagari: "सिंह", lord: "Sun" },
  { index: 5, name: "Virgo", iast: "Kanyā", devanagari: "कन्या", lord: "Mercury" },
  { index: 6, name: "Libra", iast: "Tulā", devanagari: "तुला", lord: "Venus" },
  { index: 7, name: "Scorpio", iast: "Vṛścika", devanagari: "वृश्चिक", lord: "Mars" },
  { index: 8, name: "Sagittarius", iast: "Dhanu", devanagari: "धनु", lord: "Jupiter" },
  { index: 9, name: "Capricorn", iast: "Makara", devanagari: "मकर", lord: "Saturn" },
  { index: 10, name: "Aquarius", iast: "Kumbha", devanagari: "कुम्भ", lord: "Saturn" },
  { index: 11, name: "Pisces", iast: "Mīna", devanagari: "मीन", lord: "Jupiter" },
];

export function normalizeDeg(deg: number): number {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

export function nakshatraFromSidereal(sidereal: number) {
  const lon = normalizeDeg(sidereal);
  const index = Math.min(26, Math.floor(lon / NAKSHATRA_SPAN));
  const offset = lon - index * NAKSHATRA_SPAN;
  const pada = Math.min(4, Math.floor(offset / PADA_SPAN) + 1);
  const rashiIndex = Math.min(11, Math.floor(lon / 30));
  const rashiDegree = lon - rashiIndex * 30;
  return {
    index,
    nakshatra: NAKSHATRAS[index]!,
    pada,
    offset,
    rashiIndex,
    rashi: RASHIS[rashiIndex]!,
    rashiDegree,
    lon,
  };
}

export function formatDms(deg: number): string {
  const d = Math.floor(deg);
  const mf = (deg - d) * 60;
  const m = Math.floor(mf);
  const s = Math.round((mf - m) * 60);
  if (s === 60) return formatDms(d + (m + 1) / 60);
  return `${d}° ${String(m).padStart(2, "0")}′`;
}
