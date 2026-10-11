export type Place = {
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export function placeLabel(place: Place): string {
  const bits = [place.name, place.admin1, place.country].filter(Boolean);
  const unique = bits.filter((b, i) => bits.indexOf(b) === i);
  return unique.join(", ");
}

export const CURATED_PLACES: Place[] = [
  { name: "Delhi", admin1: "Delhi", country: "India", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata" },
  { name: "Mumbai", admin1: "Maharashtra", country: "India", latitude: 19.076, longitude: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Bengaluru", admin1: "Karnataka", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata" },
  { name: "Chennai", admin1: "Tamil Nadu", country: "India", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata" },
  { name: "Kolkata", admin1: "West Bengal", country: "India", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata" },
  { name: "Hyderabad", admin1: "Telangana", country: "India", latitude: 17.385, longitude: 78.4867, timezone: "Asia/Kolkata" },
  { name: "Pune", admin1: "Maharashtra", country: "India", latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad", admin1: "Gujarat", country: "India", latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata" },
  { name: "Jaipur", admin1: "Rajasthan", country: "India", latitude: 26.9124, longitude: 75.7873, timezone: "Asia/Kolkata" },
  { name: "Lucknow", admin1: "Uttar Pradesh", country: "India", latitude: 26.8467, longitude: 80.9462, timezone: "Asia/Kolkata" },
  { name: "Varanasi", admin1: "Uttar Pradesh", country: "India", latitude: 25.3176, longitude: 82.9739, timezone: "Asia/Kolkata" },
  { name: "Chandigarh", admin1: "Chandigarh", country: "India", latitude: 30.7333, longitude: 76.7794, timezone: "Asia/Kolkata" },
  { name: "Kochi", admin1: "Kerala", country: "India", latitude: 9.9312, longitude: 76.2673, timezone: "Asia/Kolkata" },
  { name: "Thiruvananthapuram", admin1: "Kerala", country: "India", latitude: 8.5241, longitude: 76.9366, timezone: "Asia/Kolkata" },
  { name: "Coimbatore", admin1: "Tamil Nadu", country: "India", latitude: 11.0168, longitude: 76.9558, timezone: "Asia/Kolkata" },
  { name: "Madurai", admin1: "Tamil Nadu", country: "India", latitude: 9.9252, longitude: 78.1198, timezone: "Asia/Kolkata" },
  { name: "Mysuru", admin1: "Karnataka", country: "India", latitude: 12.2958, longitude: 76.6394, timezone: "Asia/Kolkata" },
  { name: "Surat", admin1: "Gujarat", country: "India", latitude: 21.1702, longitude: 72.8311, timezone: "Asia/Kolkata" },
  { name: "Vadodara", admin1: "Gujarat", country: "India", latitude: 22.3072, longitude: 73.1812, timezone: "Asia/Kolkata" },
  { name: "Nagpur", admin1: "Maharashtra", country: "India", latitude: 21.1458, longitude: 79.0882, timezone: "Asia/Kolkata" },
  { name: "Indore", admin1: "Madhya Pradesh", country: "India", latitude: 22.7196, longitude: 75.8577, timezone: "Asia/Kolkata" },
  { name: "Bhopal", admin1: "Madhya Pradesh", country: "India", latitude: 23.2599, longitude: 77.4126, timezone: "Asia/Kolkata" },
  { name: "Patna", admin1: "Bihar", country: "India", latitude: 25.5941, longitude: 85.1376, timezone: "Asia/Kolkata" },
  { name: "Bhubaneswar", admin1: "Odisha", country: "India", latitude: 20.2961, longitude: 85.8245, timezone: "Asia/Kolkata" },
  { name: "Guwahati", admin1: "Assam", country: "India", latitude: 26.1445, longitude: 91.7362, timezone: "Asia/Kolkata" },
  { name: "Amritsar", admin1: "Punjab", country: "India", latitude: 31.634, longitude: 74.8723, timezone: "Asia/Kolkata" },
  { name: "Srinagar", admin1: "Jammu and Kashmir", country: "India", latitude: 34.0837, longitude: 74.7973, timezone: "Asia/Kolkata" },
  { name: "Dehradun", admin1: "Uttarakhand", country: "India", latitude: 30.3165, longitude: 78.0322, timezone: "Asia/Kolkata" },
  { name: "Haridwar", admin1: "Uttarakhand", country: "India", latitude: 29.9457, longitude: 78.1642, timezone: "Asia/Kolkata" },
  { name: "Ujjain", admin1: "Madhya Pradesh", country: "India", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata" },
  { name: "Udaipur", admin1: "Rajasthan", country: "India", latitude: 24.5854, longitude: 73.7125, timezone: "Asia/Kolkata" },
  { name: "Jodhpur", admin1: "Rajasthan", country: "India", latitude: 26.2389, longitude: 73.0243, timezone: "Asia/Kolkata" },
  { name: "Panaji", admin1: "Goa", country: "India", latitude: 15.4909, longitude: 73.8278, timezone: "Asia/Kolkata" },
  { name: "Visakhapatnam", admin1: "Andhra Pradesh", country: "India", latitude: 17.6868, longitude: 83.2185, timezone: "Asia/Kolkata" },
  { name: "Prayagraj", admin1: "Uttar Pradesh", country: "India", latitude: 25.4358, longitude: 81.8463, timezone: "Asia/Kolkata" },
  { name: "Gurugram", admin1: "Haryana", country: "India", latitude: 28.4595, longitude: 77.0266, timezone: "Asia/Kolkata" },
  { name: "Noida", admin1: "Uttar Pradesh", country: "India", latitude: 28.5355, longitude: 77.391, timezone: "Asia/Kolkata" },
  { name: "Ranchi", admin1: "Jharkhand", country: "India", latitude: 23.3441, longitude: 85.3096, timezone: "Asia/Kolkata" },
  { name: "Raipur", admin1: "Chhattisgarh", country: "India", latitude: 21.2514, longitude: 81.6296, timezone: "Asia/Kolkata" },
  { name: "Shimla", admin1: "Himachal Pradesh", country: "India", latitude: 31.1048, longitude: 77.1734, timezone: "Asia/Kolkata" },
  { name: "Kathmandu", admin1: "Bagmati", country: "Nepal", latitude: 27.7172, longitude: 85.324, timezone: "Asia/Kathmandu" },
  { name: "Colombo", country: "Sri Lanka", latitude: 6.9271, longitude: 79.8612, timezone: "Asia/Colombo" },
  { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125, timezone: "Asia/Dhaka" },
  { name: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai" },
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore" },
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London" },
  { name: "New York", admin1: "New York", country: "United States", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York" },
  { name: "San Francisco", admin1: "California", country: "United States", latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles" },
  { name: "Toronto", admin1: "Ontario", country: "Canada", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto" },
  { name: "Vancouver", admin1: "British Columbia", country: "Canada", latitude: 49.2827, longitude: -123.1207, timezone: "America/Vancouver" },
  { name: "Montreal", admin1: "Quebec", country: "Canada", latitude: 45.5017, longitude: -73.5673, timezone: "America/Toronto" },
  { name: "Calgary", admin1: "Alberta", country: "Canada", latitude: 51.0447, longitude: -114.0719, timezone: "America/Edmonton" },
  { name: "Ottawa", admin1: "Ontario", country: "Canada", latitude: 45.4215, longitude: -75.6972, timezone: "America/Toronto" },
  { name: "Edmonton", admin1: "Alberta", country: "Canada", latitude: 53.5461, longitude: -113.4938, timezone: "America/Edmonton" },
  { name: "Winnipeg", admin1: "Manitoba", country: "Canada", latitude: 49.8951, longitude: -97.1384, timezone: "America/Winnipeg" },
  { name: "Halifax", admin1: "Nova Scotia", country: "Canada", latitude: 44.6488, longitude: -63.5752, timezone: "America/Halifax" },
  { name: "Sydney", admin1: "New South Wales", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney" },
];

function matchesQuery(place: Place, q: string): boolean {
  const hay = `${place.name} ${place.admin1 ?? ""} ${place.country}`.toLowerCase();
  return hay.includes(q);
}

function placeKey(place: Place): string {
  return `${place.name.toLowerCase()}|${(place.admin1 ?? "").toLowerCase()}|${place.country.toLowerCase()}`;
}

type GeoResult = {
  name: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  country?: string;
  admin1?: string;
};

export function deviceTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export function samePlace(a: Place, b: Place): boolean {
  return a.name === b.name && a.timezone === b.timezone && Math.abs(a.latitude - b.latitude) < 0.05;
}

function offsetHours(timeZone: string, date = new Date()): number {
  const name =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset", hour: "2-digit" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = name.match(/GMT(?:([+-])(\d{1,2})(?::(\d{2}))?)?/);
  if (!match?.[1]) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) + Number(match[3] ?? 0) / 60);
}

/** Where the device is, falling back to birth place when the timezone matches. */
export function guessCurrentPlace(birth?: Place | null): Place {
  const tz = deviceTimezone();
  if (birth && tz === birth.timezone) return birth;
  const matches = CURATED_PLACES.filter((p) => p.timezone === tz);
  if (matches.length === 1) return matches[0]!;
  if (birth && matches.some((p) => samePlace(p, birth))) return birth;
  if (matches[0]) return matches[0];
  const city = tz.split("/").pop()?.replaceAll("_", " ") ?? tz;
  const lon = Math.max(-180, Math.min(179.9, offsetHours(tz) * 15));
  return { name: city, country: "", timezone: tz, latitude: 43, longitude: lon };
}

export function zoneAbbrev(timeZone: string, date = new Date()): string {
  return (
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value ?? timeZone
  );
}

export async function searchPlaces(query: string): Promise<Place[]> {
  const q = query.trim().toLowerCase();
  const local = q.length === 0
    ? CURATED_PLACES.slice(0, 12)
    : CURATED_PLACES.filter((p) => matchesQuery(p, q)).slice(0, 8);

  if (q.length < 2) return local;

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=8&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) return local;
    const json = (await res.json()) as { results?: GeoResult[] };
    const remote: Place[] = (json.results ?? [])
      .filter((r) => typeof r.timezone === "string" && r.timezone.length > 0)
      .map((r) => ({
        name: r.name,
        admin1: r.admin1,
        country: r.country ?? "",
        latitude: r.latitude,
        longitude: r.longitude,
        timezone: r.timezone!,
      }));
    const seen = new Set(local.map(placeKey));
    const merged = [...local];
    for (const p of remote) {
      const k = placeKey(p);
      if (seen.has(k)) continue;
      seen.add(k);
      merged.push(p);
    }
    return merged.slice(0, 10);
  } catch {
    return local;
  }
}
