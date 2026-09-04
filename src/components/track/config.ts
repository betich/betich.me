/**
 * Base URL of the tracker worker (see /worker). Set PUBLIC_TRACKER_URL in .env
 * — it is inlined at build time, so a rebuild is needed to change it.
 */
const configured = import.meta.env.PUBLIC_TRACKER_URL as string | undefined;

/** The deployed worker. Baked in so the static build needs no build-time env. */
const DEPLOYED = "https://bundit-tracker.betich.workers.dev";

export const TRACKER_URL = (
  configured ?? (import.meta.env.DEV ? "http://localhost:8787" : DEPLOYED)
).replace(/\/$/, "");

/** Where to fetch an update's photo. Immutable ids, so the browser caches it. */
export function photoUrl(id: string): string {
  return `${TRACKER_URL}/photo?id=${encodeURIComponent(id)}`;
}

/** Websocket URL for a role, e.g. wss://…/ws?role=admin&key=… */
export function socketUrl(params: Record<string, string>): string {
  const url = new URL(`${TRACKER_URL}/ws`);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
}
