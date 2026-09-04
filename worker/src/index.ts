import { CLOSE, DEFAULT_TRACKER_ID, type ServerMessage } from "./protocol";
import { Tracker } from "./tracker";

export { Tracker };

export interface Env {
  TRACKER: DurableObjectNamespace<Tracker>;
  /** Comma-separated origins allowed to reach the worker. */
  ALLOWED_ORIGINS: string;
  /** Set with `wrangler secret put ADMIN_KEY`. */
  ADMIN_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // The admin key is the real gate, but pinning the origin keeps another
    // site from opening sockets with a key it scraped from a shared link.
    if (origin && !cors["Access-Control-Allow-Origin"]) {
      return new Response("forbidden origin", { status: 403 });
    }

    // Deliberately not `id`: /photo already uses that for the photo's own id.
    const stub = env.TRACKER.getByName(url.searchParams.get("tracker") || DEFAULT_TRACKER_ID);

    if (url.pathname === "/ws") {
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
        return new Response("expected websocket", { status: 426 });
      }
      if (url.searchParams.get("role") === "admin" && !(await isAdmin(url, env))) {
        return refuseUpgrade();
      }
      return stub.fetch(request);
    }

    // Photo bodies are served here rather than pushed down the socket: ids are
    // immutable, so each one caches forever and history costs nothing to rejoin.
    if (url.pathname === "/photo") {
      const id = url.searchParams.get("id");
      if (!id) return new Response("missing id", { status: 400, headers: cors });

      const dataUrl = await stub.photo(id);
      if (!dataUrl) return new Response("not found", { status: 404, headers: cors });

      const [meta, base64] = dataUrl.split(",", 2);
      const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
      return new Response(bytes, {
        headers: {
          ...cors,
          "Content-Type": /data:([^;]+)/.exec(meta)?.[1] ?? "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (url.pathname === "/state") {
      return Response.json(await stub.snapshot(), {
        headers: { ...cors, "Cache-Control": "no-store" },
      });
    }

    return new Response("not found", { status: 404, headers: cors });
  },
} satisfies ExportedHandler<Env>;

/**
 * Refuse an admin upgrade over the socket rather than with a 401, because a
 * browser surfaces nothing but "connection failed" for a non-101 response.
 */
function refuseUpgrade(): Response {
  const pair = new WebSocketPair();
  pair[1].accept();
  pair[1].send(JSON.stringify({ t: "denied", reason: "auth" } satisfies ServerMessage));
  pair[1].close(CLOSE.auth, "auth");
  return new Response(null, { status: 101, webSocket: pair[0] });
}

async function isAdmin(url: URL, env: Env): Promise<boolean> {
  const supplied = url.searchParams.get("key");
  if (!supplied || !env.ADMIN_KEY) return false;

  // Constant-time compare, on digests so the lengths always match.
  const digest = (value: string) => crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  const [a, b] = await Promise.all([digest(supplied), digest(env.ADMIN_KEY)]);
  return crypto.subtle.timingSafeEqual(a, b);
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((value) => value.trim());
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    Vary: "Origin",
  };
  if (origin && allowed.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}
