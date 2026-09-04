/** Great-circle helpers, in the small-distance regime this tracker cares about. */

const EARTH_RADIUS_M = 6_371_008.8;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export interface LatLon {
  lat: number;
  lon: number;
}

/** Haversine distance in metres. */
export function distance(from: LatLon, to: LatLon): number {
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** Initial great-circle bearing, in degrees clockwise from true north. */
export function bearing(from: LatLon, to: LatLon): number {
  const dLon = toRad(to.lon - from.lon);
  const fromLat = toRad(from.lat);
  const toLat = toRad(to.lat);
  const y = Math.sin(dLon) * Math.cos(toLat);
  const x = Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLon);
  return normalize(toDeg(Math.atan2(y, x)));
}

/** Fold any angle into [0, 360). */
export function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * Shortest signed rotation from `a` to `b`, in (-180, 180]. Used to keep the
 * needle from taking the long way round when a bearing crosses north.
 */
export function shortestTurn(a: number, b: number): number {
  return ((((b - a) % 360) + 540) % 360) - 180;
}

/** Distance as a headline number plus its unit, switching to km past a kilometre. */
export function formatDistance(metres: number): { value: string; unit: string } {
  if (metres >= 1000) {
    const km = metres / 1000;
    return { value: km.toFixed(km >= 10 ? 0 : 1), unit: "km" };
  }
  return { value: Math.round(metres).toString(), unit: "m" };
}

/** The compass point a bearing falls in, e.g. 200° → "SSW". */
const POINTS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

export function compassPoint(deg: number): string {
  return POINTS[Math.round(normalize(deg) / 22.5) % 16];
}

/** "3s ago" / "4m ago", for ageing a fix. */
export function formatAge(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.round(minutes / 60)}h ago`;
}
